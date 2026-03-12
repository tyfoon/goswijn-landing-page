import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Target, BarChart3, Lightbulb, CheckCircle2 } from "lucide-react";
import backgroundImage from "@/assets/goswijn-background.jpg";

const Expertise = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.remove("animate-on-scroll");
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target as Element);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("transition-all", "duration-700");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-background">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-on-scroll">
            Three Pillars of Success
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-on-scroll" style={{ animationDelay: "0.1s" }}>
            Building hyper-growth through strategic innovation, scalable execution, and exceptional leadership
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" onClick={() => scrollToSection("gtm-strategy")}>
              Go-to-Market Strategy
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("revenue-growth")}>
              Revenue Growth
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("leadership")}>
              Leadership
            </Button>
          </div>
        </div>
      </section>

      {/* GTM Strategy Section */}
      <section id="gtm-strategy" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Target className="w-5 h-5" />
                <span className="text-sm font-semibold">Pillar 1</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Innovative Go-to-Market Strategy
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Expert in building and executing adaptive playbooks for hyper-growth. I excel at identifying customer problems and market drivers to build an innovative GTM strategy and shared vision.
              </p>
            </div>
            
            <div className="animate-on-scroll" style={{ animationDelay: "0.1s" }}>
              <div className="glass-strong p-8 rounded-lg">
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Market Analysis</p>
                      <p className="text-sm text-muted-foreground">Rapidly identifies and acts on critical, influenceable business drivers (people, partners, regulatory, competitive trends)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Strategy Formulation</p>
                      <p className="text-sm text-muted-foreground">Defines winning GTM strategies by clarifying product, market segmentation, and scaling channels, frequently leveraging key partnerships</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {[
              { title: "Category Creation & Claiming", companies: "Tridion, DoubleClick" },
              { title: "Vision-Led GTM", companies: "Google AdTech/GMP" },
              { title: "Segment-Specific GTM", companies: "Microsoft Anti-Piracy" },
              { title: "New Segment Development", companies: "Microsoft Corporate Accounts, Eyeo" },
              { title: "Competitive GTM", companies: "Google Nordics, Google Cloud" },
            ].map((item, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">{item.companies}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Growth Section */}
      <section id="revenue-growth" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1 animate-on-scroll">
              <div className="grid grid-cols-2 gap-6">
                <Card className="glass text-center p-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-foreground">$1M → $1B</p>
                  <p className="text-sm text-muted-foreground">in 7 years</p>
                </Card>
                <Card className="glass text-center p-6">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold text-foreground">20-80%</p>
                  <p className="text-sm text-muted-foreground">YoY growth</p>
                </Card>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-on-scroll" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-semibold">Pillar 2</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Scalable & Sustained Revenue Growth
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Drives rigorous execution through scalable structures and disciplined operational governance to deliver sustained, high-speed commercial growth.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-on-scroll">
            {[
              {
                title: "Hyperscale Leadership",
                description: "Scaled a business from $1M to over $1B in 7 years (Google DoubleClick)",
              },
              {
                title: "Sustained Performance",
                description: "Delivered consistent 20-80% YoY revenue growth (Eyeo, Google, Microsoft, Tridion) and P&L improvement while growing market share (Eyeo, Exxon)",
              },
              {
                title: "New Revenue Streams",
                description: "Built new ARR-based revenue streams with non-linear investments (Microsoft)",
              },
              {
                title: "Ecosystem Scaling",
                description: "Effectively scales through new and existing ecosystem partners and channels (Eyeo, Google Cloud, DoubleClick, Microsoft)",
              },
              {
                title: "Data-Driven Operations",
                description: "Leverages data insights, technology, and AI to build efficiencies and enhance customer engagement",
              },
            ].map((item, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">Pillar 3</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Leadership & Disciplined Execution
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Builds and leads high-performing teams by fostering a culture of accountability, clear goals, and relentless focus on what is essential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {[
              {
                title: "Team Building",
                description: "Scaled multi-country, multi-disciplinary teams from 0 to 80+, focusing on talent nurturing and enablement",
              },
              {
                title: "Accountability & Results",
                description: "Fosters a culture of accountability by setting clear OKRs & KPIs (missed only 2 quarters in 20 years)",
              },
              {
                title: "Pragmatic Focus",
                description: "Data-driven decision-maker who avoids analysis paralysis. Creates a shared vision and prioritizes team capabilities over rigid roles",
              },
              {
                title: "Ruthless Prioritization",
                description: "Drives focus on essential goals. Works resourcefully with available assets while advocating for resources to accelerate growth",
              },
              {
                title: "Empowerment",
                description: "Applies a hands-on approach to add value, balanced with hands-off empowerment to ensure team ownership",
              },
              {
                title: "Problem Solving",
                description: "Proactively identifies and fixes foundational business issues (e.g., Eyeo)",
              },
            ].map((item, index) => (
              <Card key={index} className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center animate-on-scroll">
            <Card className="glass-strong inline-block p-8 max-w-2xl">
              <p className="text-2xl font-bold text-foreground mb-2">Track Record of Excellence</p>
              <p className="text-4xl font-bold text-primary mb-3">Missed only 2 quarters in 20 years</p>
              <p className="text-muted-foreground">Consistent delivery through clear OKRs & KPIs</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Drive Hyper-Growth?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how these three pillars can transform your business
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => window.location.href = "/#booking"}>
              Book a Session
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = "/#contact"}>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
