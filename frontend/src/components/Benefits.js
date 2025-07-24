import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Create content 10x faster than traditional design methods',
      stat: '10x Faster',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Generate professional designs in minutes, not days',
      stat: '90% Time Saved',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      title: 'Reduce Costs',
      description: 'Eliminate expensive design agencies and freelancers',
      stat: '80% Cost Reduction',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Scale Your Team',
      description: 'Empower every team member to create professional content',
      stat: 'Unlimited Users',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Improve Consistency',
      description: 'Maintain brand consistency across all your content',
      stat: '100% Brand Match',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Award,
      title: 'Professional Quality',
      description: 'Get designer-level results without design experience',
      stat: 'Pro Quality',
      color: 'from-rose-500 to-pink-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
      content: 'Lotaya AI has revolutionized our content creation process. We create professional designs in minutes that used to take days.',
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Small Business Owner',
      company: 'Local Cafe Chain',
      content: 'As a small business, we couldn\'t afford professional designers. Lotaya AI gives us enterprise-level design capabilities.',
      avatar: 'MR'
    },
    {
      name: 'Emily Thompson',
      role: 'Content Creator',
      company: 'Digital Agency',
      content: 'The AI tools are incredibly intuitive. Our clients are amazed by the quality and speed of our deliverables now.',
      avatar: 'ET'
    }
  ];

  return (
    <section id="benefits" className="benefits-section py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-400/20 rounded-full px-4 py-2 text-sm text-green-300 mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Transform Your Business</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Measurable Results from{' '}
            <span className="gradient-text">Day One</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their creative process 
            and achieved remarkable results with AI-powered design.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card h-full relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.color} p-3.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>

                  {/* Stat */}
                  <div className={`text-2xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-2`}>
                    {benefit.stat}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trusted by Creative Professionals
            </h3>
            <p className="text-gray-300 text-lg">
              See what our users are saying about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-indigo-400/30 transition-all duration-300"
              >
                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-xs">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Calculate Your Potential Savings
            </h3>
            <p className="text-gray-300 text-lg">
              See how much time and money you could save with Lotaya AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-white">$2,500</div>
              <div className="text-gray-400">Average Monthly Design Costs</div>
              <div className="text-red-400 text-sm">Traditional Agencies</div>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="space-y-4">
              <div className="text-4xl font-bold gradient-text">$99</div>
              <div className="text-gray-400">Monthly Subscription</div>
              <div className="text-green-400 text-sm">With Lotaya AI</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="text-2xl font-bold text-white mb-2">
              Save <span className="gradient-text">$2,401</span> every month
            </div>
            <div className="text-gray-400 mb-6">That's $28,812 per year!</div>
            
            <button className="btn-primary px-8 py-4 text-lg group">
              <span>Start Saving Today</span>
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;