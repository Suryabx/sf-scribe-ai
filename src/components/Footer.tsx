const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            © 2025 SF Manager. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by{' '}
            <span className="text-primary font-medium">Surya B</span> and{' '}
            <span className="text-primary font-medium">Abishek Raj PR</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;