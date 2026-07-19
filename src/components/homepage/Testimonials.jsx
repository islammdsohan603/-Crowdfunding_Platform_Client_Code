'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'Julian Vane',
      role: 'Collector',
      location: 'London',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
      rating: 5,
      comment: `"The attention to detail in the packaging alone is world-class. LUMINA has redefined what online luxury shopping should feel like."`,
    },
    {
      id: 2,
      name: 'Sofia Rossi',
      role: 'Creative Director',
      location: 'Milan',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      rating: 5,
      comment: `"Superior quality tech. The Vector Hub is a piece of art on my desk. Customer service was impeccable throughout the journey."`,
    },
    {
      id: 3,
      name: 'Aaron Khel',
      role: 'Founder',
      location: 'Dubai',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
      rating: 5,
      comment: `"The logistics are seamless. Ordered from Dubai and it arrived in 48 hours perfectly secured. Highly recommended."`,
    },
    {
      id: 4,
      name: 'Marcus Aurelius',
      role: 'Watch Enthusiast',
      location: 'Geneva',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
      rating: 5,
      comment: `"An absolute masterpiece. The weight, the finish, and the overall digital presentation match the physical prestige perfectly."`,
    },
    {
      id: 5,
      name: 'Elena Rostova',
      role: 'UI/UX Lead',
      location: 'Berlin',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
      rating: 5,
      comment: `"As a designer, I appreciate micro-interactions. The seamless transition and build quality exceeded my high expectations."`,
    },
    {
      id: 6,
      name: 'Kenji Sato',
      role: 'Tech Investor',
      location: 'Tokyo',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150',
      rating: 5,
      comment: `"Uncompromising standards. This ecosystem represents the true future of decentralized luxury products."`,
    },
  ];

  const doubledTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="bg-[#050508] text-white py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
          Client Voices
        </h2>
      </div>

      <div className="w-full relative flex items-center Mask-Edges">
        <div className="flex gap-6 w-max animate-marquee">
          {doubledTestimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[calc(100vw-32px)] sm:w-[400px] md:w-[420px] bg-[#0d0e12]/60 border border-gray-900 hover:border-gray-800 rounded-2xl p-8 flex flex-col justify-between gap-6 backdrop-blur-md transition-all duration-300 hover:bg-[#13151b]/80"
            >
              {/* Stars & Comment */}
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed italic">
                  {item.comment}
                </p>
              </div>

              {/* User Avatar & Info */}
              <div className="flex items-center gap-4 pt-2">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-800">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover grayscale opacity-90 hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.role}, {item.location}
                  </p>
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
