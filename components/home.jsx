'use client'
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar";
import { Faqs } from "./faqs";
import { motion, useInView } from "framer-motion"; 
import { useRef, useState } from "react";
import AnimatedText from "./ui/animatedtext";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// --- DATA: Trust Objectives ---
const trustObjectives = [
  "Promote and provide pollution-free environment",
  "Nurture a culture of responsible citizenship",
  "Enable sustainable development through community engagement",
  "Promote universal digital and general literacy",
  "Support ongoing and new research and innovation in sustainable technologies and practices",
  "Ensure and provide knowledge, wisdom and education for the poor and needy",
  "Promote moral education",
  "Promote Indian culture",
  "Promote mutual solidarity and tolerance",
  "Support education initiatives for children and women",
  "Promote education for general advance of future generations",
  "Provide food, clothing and shelter for poor and needy",
  "Inculcate non violence",
  "Promote, establish and support shelters for the needy",
  "Support parks, gardens, gyms, sports clubs, canteens and rest houses for the public",
  "Provide credit to the poor",
  "Provide fees and books to deserving children",
  "Support educational institutions, schools, colleges and vocational institutes",
  "Propagate nutritional and health services",
  "Promote clean and healthy living through physical and mental fitness",
  "Safeguard natural resources, greenery, wildlife, plants, animals, cows etc.",
  "Provide legal services and support for the needy and pursue legal action in support of the public",
  "Pursue ancillary objectives in support of the above",
  "Uplift the downtrodden",
  "Other charitable purposes or purpose of public utility deemed fit by trustees"
];

export default function HomePage() {
  // State for Recent Work View More
  const [showAllImages, setShowAllImages] = useState(false);
  
  // State for About/Objectives View More
  const [showAllObjects, setShowAllObjects] = useState(false);

  // UPDATED: Generate paths for local images stored in /public
  const recentWorkImages = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    src: `/${i + 1}.jpeg`, 
    alt: `Project Snapshot ${i + 1}`
  }));

  // Logic to determine how many images to show
  const visibleImages = showAllImages ? recentWorkImages : recentWorkImages.slice(0, 4);
  
  // Logic for Objectives
  const visibleObjects = showAllObjects ? trustObjectives : trustObjectives.slice(0, 5);

  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true, amount: 0.5 });

  return (
    <div className="min-h-screen bg-white text-purple-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
      `}</style>
      
      <div className="min-h-screen bg-white text-purple-950 diagonal-bg"> 
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col border-x border-dashed border-gray-300 bg-white">
          <Navbar />

          <main>
            <div className="bg-white relative">
            <div
              className="absolute inset-0 z-0 opacity-90"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
                  radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
                  radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
                `,
                backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
              }}
            />
            {/* Hero Section */}
            <section className="relative z-10 border-b border-dashed border-gray-300 px-4 py-16 text-center sm:px-6 sm:py-24">
              
              <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl font-merriweather px-2 leading-tight">
                <AnimatedText delay={0} className="inline-block">
                  We believe in
                </AnimatedText> 
                
                <motion.span 
                  className="text-emerald-600 inline-block"
                  initial={{ x: -20, opacity: 0, filter: "blur(5px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.7, type: "spring", damping: 12, stiffness: 100 }}
                >
                  &nbsp;sustainable development
                </motion.span>
              </h1>

              <div className="mx-auto max-w-4xl text-slate-600 sm:text-base lg:text-[15px] px-2 leading-relaxed">
                <AnimatedText delay={0.5} speed={0.01}>
                  Srivatsa Charitable Trust was founded in 2025 with the objective of promoting sustainable development by engaging 
                </AnimatedText>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-2"
                >
                  with communities so they understand the purpose and consequence of actions.
                </motion.p>
              </div>

              {/* Button */}
              <button className="mt-8 cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-purple-950 text-white hover:bg-purple-900 button-highlighted-shadow h-10 px-6 py-2">
                <span><Link href="/contact">Join our mission</Link></span>
                <svg height="18" width="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="-rotate-45">
                  <g fill="currentColor">
                    <path d="M9 1C4.589 1 1 4.589 1 9C1 13.411 4.589 17 9 17C13.411 17 17 13.411 17 9C17 4.589 13.411 1 9 1Z" fill="currentColor" opacity="0.4"></path>
                    <path d="M8.47 11.72C8.177 12.013 8.177 12.488 8.47 12.781C8.616 12.927 8.808 13.001 9 13.001C9.192 13.001 9.384 12.928 9.53 12.781L12.78 9.53103C13.073 9.23803 13.073 8.76299 12.78 8.46999L9.53 5.21999C9.237 4.92699 8.762 4.92699 8.469 5.21999C8.176 5.51299 8.176 5.98803 8.469 6.28103L10.439 8.251H1.75C1.336 8.251 1 8.587 1 9.001C1 9.415 1.336 9.751 1.75 9.751H10.439L8.469 11.721L8.47 11.72Z" fill="currentColor"></path>
                  </g>
                </svg>
              </button>
            </section>
            </div>

            {/* --- NEW SECTION: About & Objects --- */}
            <section className={`relative z-10 border-b border-dashed border-gray-300 bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 ${roboto.className}`}>
               <div className="mx-auto max-w-5xl">
                  
                  {/* Section Header */}
                  <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold font-merriweather text-purple-950 sm:text-3xl">About the Trust</h2>
                    <div className="mt-4 flex justify-center">
                      <div className="relative rounded-lg bg-white border border-gray-200 p-6 shadow-sm max-w-2xl">
                        <p className="text-lg font-medium text-slate-700 italic relative z-10">
                          Srivatsa Charitable Trust was formed in 2025 and registered as a public charitable trust.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Objectives List */}
                  <div>
                    <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400 mb-8">Our Core Objectives</h3>
                    
                    <motion.div 
                      layout
                      className={`grid gap-4 ${showAllObjects ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                    >
                      {visibleObjects.map((obj, index) => (
                        <motion.div
                          layout
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 rounded-md border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="mt-1 flex-shrink-0 text-emerald-500">
                             {/* Check Icon */}
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                             </svg>
                          </div>
                          <span className="text-slate-700 text-sm leading-relaxed">{obj}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* View More / Less Button */}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setShowAllObjects(!showAllObjects)}
                        className="group hover:cursor-pointer flex items-center gap-2 text-sm font-semibold text-purple-900 hover:text-purple-700 transition-colors"
                      >
                        {showAllObjects ? "Show Less" : "View All 25 Objectives"}
                        <svg 
                          className={`h-4 w-4 transition-transform duration-300 ${showAllObjects ? 'rotate-180' : ''}`} 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
               </div>
            </section>

            {/* Recent Work Section (Images Grid) */}
            <section className={`border-b border-dashed border-gray-300 bg-white ${roboto.className}`}>
              <div className="px-4 pt-10 pb-8 sm:px-6 sm:pt-12 sm:pb-8">
                <div className="flex items-center text-center" ref={servicesRef}> 
                  <div className="hidden sm:block flex-grow border-t border-dashed border-gray-300"></div>
                  
                  <motion.h2
                    className="text-slate-900 mx-auto sm:mx-4 flex-shrink rounded-full border border-gray-300 px-3 py-1.5 text-[10px] leading-tight font-semibold font-mono sm:flex-shrink-0 sm:px-4 sm:py-1 sm:text-sm md:px-6 md:py-2 md:text-base lg:text-xl"
                  >
                    {isInView ? (
                        <AnimatedText delay={0.2} className="inline-block">
                          Our Recent Work
                        </AnimatedText>
                    ) : (
                        <span className="opacity-0">Our Recent Work</span>
                    )}
                  </motion.h2>

                  <div className="hidden sm:block flex-grow border-t border-dashed border-gray-300"></div>
                </div>
              </div>

              {/* Image Grid */}
              <div className="p-4 sm:p-8 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {visibleImages.map((img) => (
                    <motion.div 
                      key={img.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-lg shadow-sm border border-gray-200 group"
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image 
                          src={img.src} 
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View More Button */}
                {!showAllImages && (
                  <div className="mt-10 text-center">
                    <button 
                      onClick={() => setShowAllImages(true)}
                      className="inline-flex items-center px-6 py-3 border border-purple-950 text-purple-950 text-sm font-medium rounded-md hover:bg-purple-50 transition-colors"
                    >
                      View All Work
                    </button>
                  </div>
                )}
                 {showAllImages && (
                  <div className="mt-10 text-center">
                    <button 
                      onClick={() => setShowAllImages(false)}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Show Less
                    </button>
                  </div>
                )}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-slate-50 text-slate-600 border-t border-gray-200">
            <div className="px-6 py-12 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                
                {/* Column 1: Identity */}
                <div className="flex flex-col space-y-4">
                  <h3 className="font-bold text-purple-950 text-lg font-merriweather">Srivatsa Charitable Trust</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Dedicated to building a sustainable and inclusive future through education and community welfare.
                  </p>
                  <div className="pt-2 text-xs text-slate-400">
                    © {new Date().getFullYear()} All rights reserved.
                  </div>
                </div>

                {/* Column 2: Tax Exemptions */}
                <div className="flex flex-col space-y-2">
                  <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wide text-xs">Tax Exemptions</h4>
                  <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <p className="font-mono text-xs text-slate-500">Income Tax Act S. 12A</p>
                    <p className="font-medium text-slate-700">ABMTS6650DE20251</p>
                    <p className="text-[10px] text-green-600 mt-1">Valid till AY2028-29</p>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                    <p className="font-mono text-xs text-slate-500">Income Tax Act S. 80G</p>
                    <p className="font-medium text-slate-700">ABMTS6650DF20251</p>
                    <p className="text-[10px] text-green-600 mt-1">Valid till AY2028-29</p>
                  </div>
                </div>

                {/* Column 3: Registrations */}
                <div className="flex flex-col space-y-2">
                  <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wide text-xs">Official Registrations</h4>
                  <ul className="space-y-3">
                    <li className="flex flex-col">
                      <span className="text-xs text-slate-500">Legal Entity Identifier (LEI)</span>
                      <span className="font-mono text-slate-700 bg-white border border-gray-200 px-2 py-1 rounded w-fit mt-1">984500594F1GQ1FDM687</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-slate-500">Darpan Registration ID</span>
                      <span className="font-mono text-slate-700 bg-white border border-gray-200 px-2 py-1 rounded w-fit mt-1">TN/2025/0916713</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}