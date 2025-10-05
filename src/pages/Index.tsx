import { ContactDialog } from "@/components/ContactDialog";
import backgroundImage from "@/assets/goswijn-background.png";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="px-6 py-8 md:px-12 lg:px-16">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Goswijn Thijssen
          </h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-start px-6 pt-16 md:px-12 lg:px-16 md:pt-24">
          <div className="max-w-xl space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Creating real step changes:
              </h2>
              
              <ul className="space-y-4 text-lg font-medium text-foreground md:text-xl">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                  <span>Building Go to Market strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                  <span>Generating sustainable Revenue growth</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                  <span>Flawless execution</span>
                </li>
              </ul>
            </div>

            <div className="relative z-20 pt-4">
              <ContactDialog />
            </div>
          </div>
        </main>

        {/* Bottom Gradient with Bio */}
        <div className="relative mt-auto pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background via-background/95 to-transparent" />
          <div className="relative px-6 py-12 md:px-12 lg:px-16 pointer-events-auto">
            <p className="max-w-4xl text-base leading-relaxed text-foreground md:text-lg">
              I am an entrepreneurial and results-driven commercial executive with extensive 
              leadership experience in technology and SaaS within international scale-ups and 
              organisations like Google and Microsoft. My career is centered around building 
              durable and scalable growth. I do this by developing and executing adaptive, 
              customer focussed Go-to-Market strategies and building teams that deliver 
              breakthrough results through stellar collaboration and operational excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
