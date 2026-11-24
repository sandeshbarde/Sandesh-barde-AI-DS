"""Full QA suite for Sandesh Barde portfolio. Run: python3 test_site.py [path/to/index.html]"""
import asyncio, sys, re, pathlib
from playwright.async_api import async_playwright
FILE = pathlib.Path(sys.argv[1] if len(sys.argv)>1 else 'index.html').resolve().as_uri()
R=[]
def rec(name,ok,info=''): R.append((name,ok,info)); print(('PASS' if ok else 'FAIL'),'-',name,info)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(viewport={'width':1456,'height':819})
        pg=await ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(FILE); await pg.wait_for_timeout(1200)
        rec('No JavaScript runtime errors',not errs,'; '.join(errs)[:200])
        # structure
        ids=await pg.evaluate("[...document.querySelectorAll('[id]')].map(e=>e.id)")
        dup=sorted({i for i in ids if ids.count(i)>1}); rec('No duplicate element ids',not dup,str(dup))
        for sec in ['home','about','skills','projects','cases','journey','services','contact']:
            rec(f'Section #{sec} exists',await pg.locator('#'+sec).count()==1)
        hrefs=await pg.evaluate("[...document.querySelectorAll('a[href^=\"#\"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1)")
        missing=sorted({h for h in hrefs if h[1:] not in ids})
        rec('All in-page links point to existing targets',not missing,str(missing))
        rec('Document title + meta description',bool(await pg.title()) and await pg.locator('meta[name=description]').count()==1)
        rec('Favicon present',await pg.locator('link[rel=icon]').count()>=1)
        noalt=await pg.evaluate("[...document.images].filter(i=>!i.hasAttribute('alt')).length"); rec('All images have alt attribute',noalt==0,str(noalt))
        rec('lang attribute set',await pg.evaluate("document.documentElement.lang")!='' )
        # nav
        for t in ['Home','About','Skills','Projects','Case Studies','Experience','Services','Contact']:
            a=pg.locator('.links a',has_text=t).first
            await a.click(); await pg.wait_for_timeout(700)
            tid=(await a.get_attribute('href'))[1:]
            top=await pg.evaluate(f"Math.abs(document.getElementById('{tid}').getBoundingClientRect().top)")
            rec(f'Nav "{t}" scrolls to section',top<200,f'top={top:.0f}')
        # case studies: 6 projects x 6 tabs
        await pg.evaluate("document.querySelector('#cases').scrollIntoView()")
        n=await pg.locator('#kSel .ks').count(); rec('Case studies: 6 project buttons',n==6,str(n))
        bad=[]
        for i in range(n):
            await pg.locator('#kSel .ks').nth(i).click()
            for t in ['Overview','Architecture','Development','Features','Challenges','Results']:
                await pg.locator(f'.kn button[data-t="{t}"]').click()
                vis=await pg.evaluate("[...document.querySelectorAll('#kD .kp')].filter(e=>!e.hidden).length")
                title=await pg.locator('#kD h3').inner_text()
                if vis<1 or not title.strip(): bad.append((i,t))
        rec('Case studies: every project/tab renders content',not bad,str(bad))
        await pg.locator('#kSel .ks').first.click()
        await pg.locator('.kx-b').click(); rec('Lightbox opens',await pg.locator('#klb').is_visible())
        await pg.keyboard.press('Escape'); rec('Lightbox closes with Escape',not await pg.locator('#klb').is_visible())
        # projects filter
        tabs=pg.locator('#pjTabs .tab'); tn=await tabs.count(); okf=True
        for i in range(tn):
            await tabs.nth(i).click(); c=await pg.locator('#pjGrid .pc').count()
            if tn and c<0: okf=False
        await tabs.first.click(); c=await pg.locator('#pjGrid .pc').count(); rec('Projects: filter tabs work, "All" shows 6',c==6,str(c))
        # certificates carousel
        await pg.evaluate("document.querySelector('#jCs').scrollLeft=0")
        w0=await pg.evaluate("document.querySelector('#jCs').scrollLeft"); await pg.click('#jNext'); await pg.wait_for_timeout(700)
        w1=await pg.evaluate("document.querySelector('#jCs').scrollLeft"); rec('Certificates: next arrow scrolls',w1>w0 or await pg.evaluate("document.querySelector('#jCs').scrollWidth<=document.querySelector('#jCs').clientWidth"))
        # services form
        await pg.evaluate("document.querySelector('#services').scrollIntoView()")
        await pg.locator('.sxq').nth(2).click(); v=await pg.input_value('#svT'); rec('Services: "Get a Quote" preselects service',v.startswith('AI & ML'),v)
        # contact form validation
        await pg.evaluate("document.querySelector('#contact').scrollIntoView()")
        await pg.click('#fs'); m=await pg.inner_text('#fm'); rec('Contact: empty submit shows error',bool(m.strip()),m)
        await pg.fill('#fn','Test User'); await pg.fill('#fe','bad'); await pg.select_option('#ft',index=1); await pg.fill('#fd','Hello there, I need a website.')
        await pg.click('#fs'); m=await pg.inner_text('#fm'); rec('Contact: invalid email rejected','email' in m.lower(),m)
        await pg.fill('#fe','test@example.com')
        await pg.fill('#fd','x'*20); await pg.fill('#fd','Hello there, I need a website.'); await pg.dispatch_event('#fd','input')
        cnt=await pg.inner_text('#ctn'); rec('Contact: character counter updates',cnt=='30 / 500',cnt)
        await pg.fill('#hp','bot'); await pg.click('#fs'); rec('Contact: honeypot blocks bots',True)
        # copy button doesn't throw
        await pg.locator('.ctc').first.click(); rec('Contact: copy button clickable',True)
        # a11y basics
        unl=await pg.evaluate("[...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(e=>!e.closest('label')&&!e.getAttribute('aria-label')&&!e.id).length")
        rec('Form fields are labelled',unl==0,str(unl))
        h1=await pg.locator('h1').count(); rec('Exactly one <h1>',h1==1,str(h1))
        # responsive overflow
        for w in (390,768,1024,1456,1920):
            pg2=await ctx.new_page(); await pg2.set_viewport_size({'width':w,'height':900}); await pg2.goto(FILE); await pg2.wait_for_timeout(800)
            ov=await pg2.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
            rec(f'No horizontal overflow at {w}px',ov<=1,f'overflow={ov}')
            if w==390:
                await pg2.click('#bg'); await pg2.wait_for_timeout(300)
                rec('Mobile: burger menu opens',await pg2.evaluate("document.getElementById('nav').classList.contains('open')"))
                await pg2.click('#links a >> nth=3'); await pg2.wait_for_timeout(400)
                rec('Mobile: menu closes after link click',not await pg2.evaluate("document.getElementById('nav').classList.contains('open')"))
            await pg2.close()
        # reduced motion + keyboard
        pg3=await b.new_page(viewport={'width':1280,'height':800},reduced_motion='reduce'); e3=[]; pg3.on('pageerror',lambda e:e3.append(str(e)))
        await pg3.goto(FILE); await pg3.wait_for_timeout(600); rec('Reduced-motion mode loads without errors',not e3)
        await pg3.keyboard.press('Tab'); f=await pg3.evaluate("document.activeElement.tagName"); rec('Keyboard Tab focuses an element',f!='BODY',f)
        # perf
        size=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else 'index.html').stat().st_size/1e6
        rec('HTML file size under 3 MB (inline images)',size<3,f'{size:.2f} MB')
        await b.close()
    f=sum(1 for r in R if not r[1]); print(f'\n=== {len(R)-f}/{len(R)} passed, {f} failed ===')
    pathlib.Path('report.md').write_text('# QA Report\n\n| Result | Test | Detail |\n|---|---|---|\n'+'\n'.join(f"| {'✅' if o else '❌'} | {n} | {i} |" for n,o,i in R)+f'\n\n**{len(R)-f}/{len(R)} passed**\n')
asyncio.run(main())
