'use client'

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Users,
  Calendar,
  Star,
  Twitter,
  Github,
  Linkedin,
  Brain,
  MessageCircle,
  Code,
  Target,
  Lightbulb,
  Briefcase
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type IconType = React.ComponentType<{ className?: string }>;

interface AIAgent {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
}

interface Feature {
  icon: IconType;
  title: string;
  description: string;
  delay: number;
}

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Falling elements animation
      gsap.from('.fall-element', {
        y: -200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: '.hero-cards',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Floating cards entrance
      gsap.from('.floating-card', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.hero-cards',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Features sliding in from sides
      gsap.from('.slide-left', {
        x: -200,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.slide-right', {
        x: 200,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Testimonials parallax effect
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top bottom',
        end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection heroY={heroY} heroOpacity={heroOpacity} />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Navigation = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          ZenoMeet
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        <Link href="/sign-in">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Sign Up
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
};

const HeroSection = ({
  heroY,
  heroOpacity,
}: {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Falling decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="fall-element absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 3) * 15}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 container mx-auto px-4 text-center mt-40"
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Smarter Meetings with AI Agents Tailored to You — Only on ZenoMeet
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Schedule personalized sessions with AI agents for learning, interview prep, and more.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
            Learn More
          </Button>
        </motion.div>

        {/* Multiple AI Agent Cards */}
        <MultipleAICards />
      </motion.div>
    </section>
  );
};

const MultipleAICards = () => {
  const aiAgents: AIAgent[] = [
    {
      icon: Brain,
      title: 'AI Teaching Agent',
      description: 'Master any subject with personalized lessons',
      gradient: 'from-blue-500 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
    },
    {
      icon: MessageCircle,
      title: 'Interview Coach',
      description: 'Ace interviews with real-time feedback',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    },
    {
      icon: Code,
      title: 'Coding Mentor',
      description: 'Level up your programming skills',
      gradient: 'from-green-500 to-blue-500',
      bgGradient: 'from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20',
    },
    {
      icon: Target,
      title: 'Career Advisor',
      description: 'Navigate your career path with confidence',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Guide',
      description: 'Spark creativity and innovative thinking',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    },
    {
      icon: Briefcase,
      title: 'Business Strategist',
      description: 'Build and scale your business ideas',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    },
  ];

  return (
    <div className="hero-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {aiAgents.map((agent, index) => (
        <FloatingAICard key={index} agent={agent} index={index} />
      ))}
    </div>
  );
};

const FloatingAICard = ({ agent, index }: { agent: AIAgent; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / 15;
      const deltaY = (e.clientY - centerY) / 15;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(20px)`;
    };

    const resetTransform = () => {
      if (cardRef.current) {
        cardRef.current.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', resetTransform);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', resetTransform);
      };
    }
  }, []);

  const Icon = agent.icon;

  return (
    <motion.div
      ref={cardRef}
      className="floating-card w-full h-80 transition-transform duration-300 ease-out cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100,
      }}
    >
      <Card
        className={`w-full h-full bg-gradient-to-br ${agent.bgGradient} backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300`}
      >
        <CardContent className="p-6 h-full flex flex-col items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`w-20 h-20 bg-gradient-to-r ${agent.gradient} rounded-full flex items-center justify-center mb-6 shadow-lg`}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold mb-3 text-center">{agent.title}</h3>
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {agent.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const features: Feature[] = [
    {
      icon: BookOpen,
      title: 'AI Teaching Agent',
      description: 'Master any subject with tailored lessons designed just for you',
      delay: 0,
    },
    {
      icon: Users,
      title: 'Interview Coach',
      description: 'Ace your next job interview with real-time feedback and practice',
      delay: 0.2,
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions anytime, anywhere that fits your busy schedule',
      delay: 0.4,
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="features-section py-24 bg-background relative overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose AImpact?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized learning with our advanced AI mentors
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  feature,
  index,
  isInView,
}: {
  feature: Feature;
  index: number;
  isInView: boolean;
}) => {
  const slideClass = index % 2 === 0 ? 'slide-left' : 'slide-right';

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: feature.delay }}
      whileHover={{
        y: -10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
      className={`group ${slideClass}`}
    >
      <Card className="p-8 h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-0 text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const steps = [
    {
      number: 1,
      title: 'Choose Your Agent',
      description: 'Select from a variety of AI mentors specialized in different fields',
    },
    {
      number: 2,
      title: 'Schedule a Session',
      description: 'Pick a time that suits you with our flexible booking system',
    },
    {
      number: 3,
      title: 'Learn and Grow',
      description: 'Engage in interactive, personalized meetings tailored to your goals',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How AImpact Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with your AI mentor in three simple steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="flex items-center mb-12 last:mb-0"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-8"
              >
                {step.number}
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: (index + 1) * 0.3 }}
                  className="absolute left-8 mt-16 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-500"
                  style={{ marginLeft: '1.875rem' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const testimonials = [
    {
      quote: 'AImpact helped me ace my coding interview! The personalized feedback was incredible.',
      author: 'Jane D.',
      role: 'Software Engineer',
      avatar:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote: 'The AI teaching agent made complex topics so easy to understand. Highly recommend!',
      author: 'Mark S.',
      role: 'Data Scientist',
      avatar:
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face',
    },
    {
      quote: 'Flexible scheduling and expert guidance - exactly what I needed for my career growth.',
      author: 'Sarah L.',
      role: 'Product Manager',
      avatar:
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=face',
    },
  ];

  return (
    <section ref={sectionRef} className="testimonials-section py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with AImpact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  {/* Escape quotes to satisfy react/no-unescaped-entities */}
                  <p className="text-gray-100 mb-6 italic">{`"${testimonial.quote}"`}</p>
                  <div className="flex items-center">
                    <motion.img
                      whileHover={{ rotateY: 15 }}
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      style={{ transformStyle: 'preserve-3d' }}
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-gray-300 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CallToActionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/10 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Join thousands of users mastering their goals with AImpact
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl font-semibold">
              Start Your Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
  ];

  const socialIcons = [
    { Icon: Twitter, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            >
              AImpact
            </motion.div>
            <p className="text-gray-400">
              Transforming learning through AI-powered mentorship and personalized guidance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <motion.div className="space-y-2">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors block">
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2025 AImpact. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Home;
