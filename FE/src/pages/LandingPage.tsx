import { Link } from "react-router-dom";
import {
  Shield,
  TrendingUp,
  Eye,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Leaf,
  Sun,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Early Disease Detection",
      description:
        "AI-powered monitoring to detect livestock diseases before they spread, saving lives and reducing financial losses.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description:
        "Continuous monitoring of temperature, humidity, and environmental conditions with instant alerts.",
    },
    {
      icon: Eye,
      title: "Live Video Monitoring",
      description:
        "Stream live feeds from your farm with intelligent detection capabilities powered by computer vision.",
    },
    {
      icon: Clock,
      title: "24/7 Surveillance",
      description:
        "Round-the-clock monitoring ensures no critical moments are missed, protecting your livestock investment.",
    },
  ];

  const stats = [
    { value: "95%", label: "Detection Accuracy" },
    { value: "24/7", label: "Monitoring" },
    { value: "< 1min", label: "Response Time" },
    { value: "80%", label: "Cost Reduction" },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative bg-hero-gradient pt-32 pb-24 overflow-hidden">
        <div className="leaf-pattern"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[hsl(142,55%,45%,0.08)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(152,45%,30%,0.06)] rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[hsl(142,55%,45%,0.1)] px-4 py-2 rounded-full mb-6 animate-fade-in-up">
                <Sun className="w-4 h-4 text-[hsl(25,90%,55%)]" />
                <span className="text-sm font-medium text-[hsl(152,45%,30%)]">
                  Smart Agriculture Technology
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100 font-['Playfair_Display']"
                style={{ opacity: 0 }}
              >
                <span className="text-[hsl(152,40%,20%)]">Protect Your</span>
                <span className="text-gradient block mt-2">Livestock</span>
              </h1>

              <p
                className="text-lg md:text-xl text-[hsl(152,20%,40%)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200"
                style={{ opacity: 0 }}
              >
                Advanced agriculture technology that detects diseases early
                through real-time monitoring, preventing animal deaths and
                significant financial losses.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300"
                style={{ opacity: 0 }}
              >
                <Link to="/temperature" className="btn-primary group">
                  Start Monitoring
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/feed" className="btn-secondary">
                  View Live Feed
                  <Eye className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div
              className="relative animate-fade-in-up delay-400 hidden lg:block"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(152,45%,30%)] to-[hsl(142,55%,45%)] rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(152,45%,30%)] to-[hsl(142,55%,45%)] rounded-3xl transform -rotate-3 opacity-30"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[hsl(140,25%,88%)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[hsl(142,55%,45%,0.1)] rounded-2xl p-6 animate-float">
                      <Shield className="w-10 h-10 text-[hsl(152,45%,30%)] mb-3" />
                      <p className="font-semibold text-[hsl(152,40%,20%)]">
                        Protected
                      </p>
                      <p className="text-3xl font-bold text-gradient">1,250</p>
                      <p className="text-sm text-[hsl(152,20%,45%)]">
                        Livestock
                      </p>
                    </div>
                    <div className="bg-[hsl(25,90%,55%,0.1)] rounded-2xl p-6 animate-float delay-200">
                      <TrendingUp className="w-10 h-10 text-[hsl(25,90%,55%)] mb-3" />
                      <p className="font-semibold text-[hsl(152,40%,20%)]">
                        Health
                      </p>
                      <p className="text-3xl font-bold text-[hsl(25,90%,55%)]">
                        98%
                      </p>
                      <p className="text-sm text-[hsl(152,20%,45%)]">Optimal</p>
                    </div>
                    <div className="col-span-2 bg-gradient-to-r from-[hsl(152,45%,30%)] to-[hsl(142,55%,45%)] rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-80">Active Alerts</p>
                          <p className="text-2xl font-bold">143</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse-glow">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm border-y border-[hsl(140,25%,88%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="text-[hsl(152,20%,45%)] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-hero-gradient relative">
        <div className="leaf-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-[hsl(142,55%,45%,0.1)] text-[hsl(152,45%,30%)] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(152,40%,18%)] mb-4 font-['Playfair_Display']">
              Comprehensive Farm Monitoring
            </h2>
            <p className="text-xl text-[hsl(152,20%,45%)] max-w-3xl mx-auto">
              Our integrated system provides complete oversight of your
              livestock health and environmental conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              >
                <div className="icon-box mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(152,40%,18%)] mb-4 font-['Playfair_Display']">
                  {feature.title}
                </h3>
                <p className="text-[hsl(152,20%,45%)] leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section
        id="solution"
        className="py-24 bg-section-gradient text-white relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-2 border-white/20 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left" style={{ opacity: 0 }}>
              <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                The Challenge
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display']">
                The Problem
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Farmers often detect diseases too late due to a lack of
                real-time health monitoring, leading to animal deaths and
                significant financial losses.
              </p>
              <div className="space-y-4">
                {[
                  "Late disease detection",
                  "Increased mortality rates",
                  "Significant financial losses",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[hsl(25,90%,55%)] flex items-center justify-center">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-right" style={{ opacity: 0 }}>
              <span className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Answer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display']">
                Our Solution
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Advanced monitoring technology that provides early detection,
                real-time alerts, and comprehensive health tracking.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="solution-card">
                  <Zap className="w-8 h-8 text-[hsl(25,90%,55%)] mb-3" />
                  <h4 className="font-semibold text-lg mb-1">Instant Alerts</h4>
                  <p className="text-sm text-white/70">
                    Real-time notifications sent to your device
                  </p>
                </div>
                <div className="solution-card">
                  <BarChart3 className="w-8 h-8 text-[hsl(25,90%,55%)] mb-3" />
                  <h4 className="font-semibold text-lg mb-1">Data Analytics</h4>
                  <p className="text-sm text-white/70">
                    Comprehensive insights and reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-hero-gradient relative">
        <div className="leaf-pattern"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-[hsl(140,25%,88%)]">
            <div className="w-20 h-20 bg-gradient-to-br from-[hsl(152,45%,30%)] to-[hsl(142,55%,45%)] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(152,40%,18%)] mb-6 font-['Playfair_Display']">
              Ready to Protect Your Farm?
            </h2>
            <p className="text-xl text-[hsl(152,20%,45%)] mb-8 max-w-2xl mx-auto">
              Start monitoring your livestock health with our advanced
              agriculture technology today.
            </p>
            <Link
              to="/temperature"
              className="btn-primary text-lg py-4 px-8 group"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(152,40%,18%)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-['Playfair_Display']">
                LiveStock Monitoring System
              </span>
            </div>
            <p className="text-white/60 text-sm">
              © 2026 LiveStock Monitoring System. Protecting livestock with smart technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
