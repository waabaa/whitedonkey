"use client";

// AI Partner Company Logo Components
const OpenAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M12 2L3 22h18L12 2zM8.5 18l3.5-8 3.5 8h-7z"/>
  </svg>
);

const PerplexityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3zm0 2.2L5.4 8.2v7.6L12 18.8l6.6-3v-7.6L12 5.2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M11.4 0H0v11.4h11.4V0zM24 0H12.6v11.4H24V0zM11.4 12.6H0V24h11.4V12.6zM24 12.6H12.6V24H24V12.6z"/>
  </svg>
);

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M24 12.073c0 5.989-4.394 10.954-10.13 11.855v-8.363h2.789l.531-3.46H13.87V9.86c0-.949.464-1.874 1.95-1.874h1.509V5.045s-1.37-.234-2.679-.234c-2.734 0-4.52 1.657-4.52 4.656v2.637H7.091v3.46h3.039v8.363C4.395 23.025 0 18.061.001 12.073c0-6.627 5.373-12 12-12s12 5.373 12 12z"/>
  </svg>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const NvidiaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M12.1 2C6.6 2 2.1 6.5 2.1 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm4.8 14.5c-.8.8-2.1.8-2.9 0L12 14.5 10 16.5c-.8.8-2.1.8-2.9 0s-.8-2.1 0-2.9L9.1 11.6 7.1 9.6c-.8-.8-.8-2.1 0-2.9s2.1-.8 2.9 0L12 8.7l2-2c.8-.8 2.1-.8 2.9 0s.8 2.1 0 2.9l-2 2 2 2c.8.8.8 2.1 0 2.9z"/>
  </svg>
);

const HuggingFaceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9C9.33 9 10 9.67 10 10.5S9.33 12 8.5 12 7 11.33 7 10.5 7.67 9 8.5 9zM12 18c-2.28 0-4.22-1.66-5-4h10c-.78 2.34-2.72 4-5 4zm3.5-6c-.83 0-1.5-.67-1.5-1.5S14.67 9 15.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const StabilityAILogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const aiCompanies = [
  { name: "OpenAI", logo: <OpenAILogo /> },
  { name: "Anthropic", logo: <AnthropicLogo /> },
  { name: "Perplexity", logo: <PerplexityLogo /> },
  { name: "Microsoft", logo: <MicrosoftLogo /> },
  { name: "Meta", logo: <MetaLogo /> },
  { name: "Google", logo: <GoogleLogo /> },
  { name: "Nvidia", logo: <NvidiaLogo /> },
  { name: "Hugging Face", logo: <HuggingFaceLogo /> },
  { name: "Stability AI", logo: <StabilityAILogo /> }
];

export function AIPartnersSection() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-light text-muted-foreground mb-2">
            AI 기술 파트너십
          </h3>
          <p className="text-sm text-muted-foreground">
            글로벌 AI 기술 기업들과의 협력을 통한 최고 수준의 서비스 제공
          </p>
        </div>

        {/* Auto-scrolling logos container */}
        <div className="relative">
          <div className="flex animate-scroll-left space-x-12 items-center">
            {/* First set of logos */}
            {aiCompanies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-4 whitespace-nowrap px-6 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors duration-300 min-w-fit group"
              >
                <div className="text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                  {company.logo}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {company.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {aiCompanies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-4 whitespace-nowrap px-6 py-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors duration-300 min-w-fit group"
              >
                <div className="text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                  {company.logo}
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {company.name}
                </span>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}