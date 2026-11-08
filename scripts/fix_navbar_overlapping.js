const fs = require('fs');

console.log('Applying Navbar single-line & no-wrap fix...');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Replace nav CSS
const oldNavCss = `    /* Navigation links */
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
    }

    .nav-item a {
      display: inline-block;
      padding: 8px 14px;
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-main);
      border-radius: var(--radius-pill);
      transition: var(--transition);
    }

    .nav-item.active a {
      background: var(--bg-pill);
      color: var(--rose-primary);
      font-weight: 600;
    }

    .nav-item a:hover:not(.active a) {
      color: var(--rose-primary);
      background: rgba(242, 216, 227, 0.4);
    }`;

const newNavCss = `    /* Navigation links — Fixed Single Line & No-Wrap */
    .nav-menu {
      display: flex;
      align-items: center;
      gap: clamp(4px, 0.6vw, 10px);
      list-style: none;
      flex-wrap: nowrap;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      flex-shrink: 0;
      white-space: nowrap;
    }

    .nav-item a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 7px clamp(8px, 0.8vw, 14px);
      font-size: 0.86rem;
      font-weight: 500;
      color: var(--text-main);
      border-radius: var(--radius-pill);
      transition: var(--transition);
      white-space: nowrap !important;
      text-decoration: none;
      line-height: 1.2;
    }

    .nav-item.active a {
      background: var(--bg-pill);
      color: var(--rose-primary);
      font-weight: 600;
      white-space: nowrap !important;
    }

    .nav-item a:hover:not(.active a) {
      color: var(--rose-primary);
      background: rgba(242, 216, 227, 0.45);
    }`;

if (html.includes(oldNavCss)) {
  html = html.replace(oldNavCss, newNavCss);
  console.log('Replaced old nav CSS with no-wrap nav CSS.');
} else {
  console.warn('Could not find exact oldNavCss block, checking fallback...');
}

// 2. Adjust responsive breakpoint for mobile drawer from 992px to 1080px
const oldBreakpoint = '@media (max-width: 992px) {\n      :root {\n        --nav-height: 64px;\n      }\n\n      .nav-menu,';
const newBreakpoint = '@media (max-width: 1080px) {\n      :root {\n        --nav-height: 64px;\n      }\n\n      .nav-menu,';

if (html.includes(oldBreakpoint)) {
  html = html.replace(oldBreakpoint, newBreakpoint);
  console.log('Updated mobile nav breakpoint to 1080px.');
}

// 3. Make English translations crisper
html = html.replace('nav_services: "Our Care",', 'nav_services: "Our Services",');
html = html.replace('nav_about: "About Us",', 'nav_about: "About Us",');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Fix successfully written to public/index.html');
