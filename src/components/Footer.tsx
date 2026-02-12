const Footer = () => {
  return (
    <footer className="bg-primary border-t border-secondary py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-display text-lg font-bold text-primary-foreground mb-3">
              FORTUNE <span className="text-accent">INNOVATIVES</span>
            </h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Tamil Nadu's premier skill development & placement institute building careers since 2018.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-3 text-sm tracking-wider uppercase">Courses</h4>
            <ul className="space-y-2 text-primary-foreground/50 text-sm">
              <li>Full Stack Development</li>
              <li>Data Science & ML</li>
              <li>Digital Marketing</li>
              <li>Cloud & DevOps</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-3 text-sm tracking-wider uppercase">Branches</h4>
            <ul className="space-y-2 text-primary-foreground/50 text-sm">
              <li>Erode</li>
              <li>Coimbatore</li>
              <li>Salem</li>
              <li>Tiruppur</li>
              <li>Chennai</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-3 text-sm tracking-wider uppercase">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/50 text-sm">
              <li>info@fortuneinnovatives.com</li>
              <li>+91 94433 00000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary pt-6 text-center text-primary-foreground/30 text-sm">
          © {new Date().getFullYear()} Fortune Innovatives. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
