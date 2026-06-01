import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsConfig } from '@/config';

export function Testimonials() {
  if (!testimonialsConfig.heading && testimonialsConfig.testimonials.length === 0) return null;

  const testimonials = testimonialsConfig.testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating, testimonials.length]);

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    goToSlide((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  const prevSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goToSlide, testimonials.length]);

  // Auto-advance slides
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="about-dark font-jakarta w-full overflow-hidden py-24 lg:py-32">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          {testimonialsConfig.label && (
            <div
              className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#8A8FA3]">
                {testimonialsConfig.label}
              </span>
            </div>
          )}

          {testimonialsConfig.heading && (
            <h2
              className={cn(
                'mt-4 text-[clamp(28px,3.2vw,44px)] font-extrabold leading-tight tracking-tight text-white transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {testimonialsConfig.heading}
            </h2>
          )}
        </div>

        {/* Testimonials Slider */}
        <div
          className={cn(
            'relative transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="grid items-start gap-12 lg:grid-cols-[auto,1fr] lg:gap-16">
            {/* Image Side — floating portrait with brand glow (same effect as About) */}
            <div className="flex justify-center lg:justify-start">
              <div className="about-float about-image-glow relative w-[280px] sm:w-[320px]">
                <div
                  className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.08]"
                  style={{
                    boxShadow:
                      '0 30px 60px -15px rgba(0,0,0,0.7), 0 0 50px -10px rgba(59,130,246,0.35), 0 0 80px -20px rgba(139,92,246,0.30)',
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 transition-all duration-1000 ease-out',
                        index === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : index < activeIndex
                          ? 'opacity-0 -translate-y-full'
                          : 'opacity-0 translate-y-full'
                      )}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-5 w-5 transition-all duration-300',
                      i < testimonials[activeIndex].rating
                        ? 'fill-[#2DD4C4] text-[#2DD4C4]'
                        : 'text-white/20'
                    )}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative min-h-[220px] lg:min-h-[240px]">
                <Quote className="absolute -left-1 -top-2 h-8 w-8 text-white/10" />
                {testimonials.map((testimonial, index) => (
                  <p
                    key={index}
                    className={cn(
                      'absolute inset-0 text-[19px] leading-relaxed text-[#E4E7EF] transition-all duration-700 ease-out lg:text-[22px]',
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'pointer-events-none opacity-0 translate-y-4'
                    )}
                  >
                    “{testimonial.quote}”
                  </p>
                ))}
              </div>

              {/* Author Info */}
              <div className="border-t border-white/[0.08] pt-5">
                <div className="relative min-h-[64px]">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={cn(
                        'absolute inset-0 transition-all duration-500 ease-out',
                        index === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : 'pointer-events-none opacity-0 translate-y-4'
                      )}
                    >
                      <p className="text-[22px] font-semibold text-white">{testimonial.author}</p>
                      <p className="mt-1 text-[17px] text-[#8A8FA3]">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        index === activeIndex ? 'w-6' : 'w-2 bg-white/25 hover:bg-white/45'
                      )}
                      style={
                        index === activeIndex
                          ? { background: 'linear-gradient(90deg, #2DD4C4, #3B82F6, #8B5CF6)' }
                          : undefined
                      }
                      aria-label={`Ir al testimonio ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    aria-label="Testimonio anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
