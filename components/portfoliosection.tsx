import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { motion } from 'framer-motion';

export const PortfolioSection = () => {
    const portfolioProjects  = [
        {
          title: "Skorboard",
          subtitle: "Real-time Score Tracking Platform",
          tech: "MERN Stack",
          client: "Built for a USA client",
          overview:
            "Skorboard is a real-time socket-based web app developed by Fantronics, covering live scores for MLB, NHL, NFL, NCAAF, CBK, and NBA league matches.",
          features: ["Real-time live score updates", "Built using WebSockets for instant data transmission"],
          description:
            "I developed an interactive and responsive UI to provide sports fans with seamless real-time game updates.",
          image: `?height=600&width=800`,
          mobileImage: "/placeholder.svg?height=400&width=200",
          link: "#",
        },
        {
          title: "E-Commerce Platform",
          subtitle: "Online Shopping Experience",
          tech: "Next.js + Stripe",
          client: "Built for a Retail Business",
          overview:
            "A complete e-commerce solution with product catalog, shopping cart, user authentication, and payment processing.",
          features: ["Responsive product catalog with filtering", "Secure payment processing with Stripe"],
          description:
            "I designed and developed a full-featured e-commerce platform with a focus on user experience and conversion optimization.",
          image: "/placeholder.svg?height=600&width=800",
          mobileImage: "/placeholder.svg?height=400&width=200",
          link: "#",
        },
      ]
  return (
    <>
    <section id="portfolio" className="min-h-screen py-20 bg-slate-900/50 dark:bg-slate-200/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-anton tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          RECENT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
            PROJECTS
          </span>
        </motion.h2>

        <div className="space-y-32">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 ${index % 2 === 0 ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"} gap-8 items-center`}
            >
              <motion.div
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl font-anton tracking-tight">{project.title}</h3>
                <p className="text-purple-400 dark:text-purple-600">{project.subtitle}</p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Tech Stack:</span>
                    <span className="text-gray-300 dark:text-gray-700">{project.tech}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Client:</span>
                    <span className="text-gray-300 dark:text-gray-700">{project.client}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Overview</h4>
                  <p className="text-gray-300 dark:text-gray-700">{project.overview}</p>
                </div>

                <div className="space-y-2">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-400 dark:text-purple-600 mr-2 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <p className="text-gray-300 dark:text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 dark:text-gray-700">{project.description}</p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 dark:bg-purple-600/10 dark:hover:bg-purple-600/20 text-white dark:text-slate-900 rounded-full flex items-center gap-2 px-6 py-3 relative overflow-hidden group"
                    asChild
                  >
                    <Link href={project.link}>
                      <span className="relative z-10">Browse the platform</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.4 }}
>
{/* Laptop Image */}
<div className="relative rounded-xl overflow-hidden border border-purple-500/20 dark:border-purple-600/20 aspect-video">
<Image
  src={ project.mobileImage || "/placeholder.svg"}
  alt={project.title}
  fill
  className="object-cover"
/>
</div>

{/* Mobile Image */}
<motion.div
className="absolute -bottom-10 mobile-div -right-10 md:bottom-10 md:right-10 w-20 h-40 sm:w-24 sm:h-48 md:w-32 md:h-64 rounded-xl overflow-hidden border-2 border-purple-500 dark:border-purple-600 shadow-lg shadow-purple-500/20 dark:shadow-purple-600/20"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, delay: 0.8 }}
>
<Image
  src={project.mobileImage || "/placeholder.svg"}
  alt={`${project.title} mobile view`}
  fill
  className="object-cover"
/>
</motion.div>
</motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          className="mt-32 pt-16 border-t border-purple-500/10 dark:border-purple-600/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-xl font-semibold mb-12 text-gray-400 dark:text-gray-600">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { name: "Figma", icon: "/placeholder.svg?height=40&width=40" },
              { name: "Vercel", icon: "/placeholder.svg?height=40&width=40" },
              { name: "React", icon: "/placeholder.svg?height=40&width=40" },
              { name: "Next.js", icon: "/placeholder.svg?height=40&width=40" },
              { name: "TailwindCSS", icon: "/placeholder.svg?height=40&width=40" },
              { name: "TypeScript", icon: "/placeholder.svg?height=40&width=40" },
              { name: "MongoDB", icon: "/placeholder.svg?height=40&width=40" },
              { name: "Express", icon: "/placeholder.svg?height=40&width=40" },
              { name: "GSAP", icon: "/placeholder.svg?height=40&width=40" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center"
              >
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-xs text-gray-500 dark:text-gray-600 mt-2">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
  </>
  )
}
