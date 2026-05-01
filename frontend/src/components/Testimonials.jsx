import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      flag: "🇺🇸",
      city: "Mumbai",
      rating: 5,
      quote: "The service was exceptional. Found an English-speaking doctor within 15 minutes of my call."
    },
    {
      name: "Yuki Tanaka",
      flag: "🇯🇵",
      city: "Delhi",
      rating: 5,
      quote: "Very helpful for travelers. The cost estimator was spot on, and the doctor was very professional."
    },
    {
      name: "Hans Schmidt",
      flag: "🇩🇪",
      city: "Goa",
      rating: 4,
      quote: "Easy to use and reliable. Highly recommend for any traveler visiting India."
    },
    {
      name: "Emma Wilson",
      flag: "🇬🇧",
      city: "Bangalore",
      rating: 5,
      quote: "Saved my trip! I was quite ill and didn't know where to go. CityDoctor guided me to a great clinic."
    },
    {
      name: "Priya Sharma",
      flag: "🇮🇳",
      city: "Jaipur",
      rating: 5,
      quote: "Excellent domestic support as well. The emergency response was very quick."
    },
    {
      name: "Luca Rossi",
      flag: "🇮🇹",
      city: "Mumbai",
      rating: 5,
      quote: "Fantastic experience. The language support made all the difference during my stay."
    }
  ];

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-textMain text-center mb-16">
          Travelers Who Found Help Through CityDoctor
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="modern-card p-10 flex flex-col relative">
              <div className="text-5xl text-secondary opacity-20 absolute top-6 right-8">"</div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-sm">★</span>
                ))}
              </div>
              <p className="text-textMain font-medium text-lg leading-relaxed mb-8 italic grow">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-bgLight pt-6">
                <div className="w-12 h-12 bg-bgLight rounded-full flex items-center justify-center text-2xl">
                    {t.flag}
                </div>
                <div>
                  <p className="font-bold text-textMain">{t.name}</p>
                  <p className="text-xs font-bold text-textSecondary uppercase tracking-widest">Visited {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
