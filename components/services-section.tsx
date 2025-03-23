"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  Code,
  Palette,
  Database,
  Zap,
  Server,
  Layers,
  Globe,
  Smartphone,
  Shield,
  Clock,
  Users,
  Search,
} from "lucide-react"

interface ServiceProps {
  icon: React.ReactNode
  title: string
  description: string
  features: {
    text: string
    icon: React.ReactNode
  }[]
}

export function ServicesSection() {
  // Services data with enhanced features including icons
  const services = [
    {
      icon: <Code className="h-6 w-6 text-purple-400 dark:text-purple-600" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks like React and Next.js. Responsive, accessible, and optimized for performance.",
      features: [
        {
          text: "Single Page Applications (SPAs)",
          icon: <Zap size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Progressive Web Apps (PWAs)",
          icon: <Globe size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        { text: "E-commerce Solutions", icon: <Database size={16} className="text-purple-400 dark:text-purple-600" /> },
        {
          text: "Content Management Systems",
          icon: <Layers size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Custom Admin Dashboards",
          icon: <Server size={16} className="text-purple-400 dark:text-purple-600" />,
        },
      ],
    },
    {
      icon: <Palette className="h-6 w-6 text-purple-400 dark:text-purple-600" />,
      title: "UI/UX Design",
      description:
        "Intuitive and visually appealing interfaces that enhance user experience. From wireframes to polished designs.",
      features: [
        { text: "User Interface Design", icon: <Palette size={16} className="text-purple-400 dark:text-purple-600" /> },
        {
          text: "User Experience Research",
          icon: <Search size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Wireframing & Prototyping",
          icon: <Layers size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Responsive Mobile Designs",
          icon: <Smartphone size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        { text: "User Testing & Feedback", icon: <Users size={16} className="text-purple-400 dark:text-purple-600" /> },
      ],
    },
    {
      icon: <Server className="h-6 w-6 text-purple-400 dark:text-purple-600" />,
      title: "API Development",
      description:
        "Robust and scalable APIs built with Node.js. RESTful or GraphQL endpoints that power your applications.",
      features: [
        { text: "RESTful API Design", icon: <Server size={16} className="text-purple-400 dark:text-purple-600" /> },
        {
          text: "GraphQL API Development",
          icon: <Database size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Authentication & Security",
          icon: <Shield size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Real-time Data Processing",
          icon: <Clock size={16} className="text-purple-400 dark:text-purple-600" />,
        },
        {
          text: "Third-party API Integration",
          icon: <Globe size={16} className="text-purple-400 dark:text-purple-600" />,
        },
      ],
    },
  ]

  return (
    <section id="services" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950 dark:from-slate-100 dark:via-indigo-50/50 dark:to-slate-100 pointer-events-none transition-colors duration-500"></div>

      {/* Animated background elements - reduced number and opacity */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/5 dark:bg-purple-600/5"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            viewport={{ once: false }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-anton tracking-tight mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            MY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
              SERVICES
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-300 dark:text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I offer a comprehensive range of web development services to help businesses establish a strong online
            presence. From concept to deployment, I ensure that every project is delivered with the highest quality and
            attention to detail.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-full"
              >
                <motion.div
                  className="h-full rounded-xl p-1 bg-slate-900/40 dark:bg-slate-200/40 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-600 dark:hover:from-purple-600 dark:hover:to-pink-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="bg-slate-950 dark:bg-white rounded-lg h-full p-6 relative overflow-hidden flex flex-col service-card"
                    initial={{ height: "auto" }}
                    whileHover={{
                      height: "auto",
                      transition: { duration: 0.5 },
                    }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent dark:from-purple-600/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      className="rounded-full bg-purple-500/10 dark:bg-purple-600/10 w-16 h-16 flex items-center justify-center mb-6 relative z-10"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {service.icon}
                    </motion.div>

                    <h3 className="text-2xl font-semibold mb-4 relative z-10">{service.title}</h3>
                    <p className="text-gray-300 dark:text-gray-700 mb-8 relative z-10 flex-grow">
                      {service.description}
                    </p>

                    <div className="relative z-10 mt-auto">
                      <div className="features-container overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{
                            opacity: 1,
                            height: "auto",
                            transition: {
                              opacity: { duration: 0.3 },
                              height: { duration: 0.5 },
                            },
                          }}
                          className="features-wrapper"
                        >
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            whileHover={{
                              y: 0,
                              opacity: 1,
                              transition: { duration: 0.4, delay: 0.1 },
                            }}
                          >
                            <h4 className="text-lg font-semibold text-purple-400 dark:text-purple-600 mb-4 border-b border-purple-500/20 dark:border-purple-600/20 pb-2">
                              Key Features
                            </h4>
                            <ul className="space-y-3">
                              {service.features.map((feature, i) => (
                                <motion.li
                                  key={feature.text}
                                  className="flex items-center gap-3 text-gray-300 dark:text-gray-700 feature-item group"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileHover={{
                                    x: 5,
                                    transition: { duration: 0.2 },
                                  }}
                                  whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                      duration: 0.3,
                                      delay: 0.1 + i * 0.1,
                                    },
                                  }}
                                  viewport={{ once: false }}
                                >
                                  <div className="h-8 w-8 rounded-full bg-purple-500/10 dark:bg-purple-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-600/20 transition-colors">
                                    {feature.icon}
                                  </div>
                                  <span className="text-sm md:text-base group-hover:text-purple-400 dark:group-hover:text-purple-600 transition-colors">
                                    {feature.text}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Process Section - Enlarged heading and removed arrows */}
          <motion.div
            className="mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-anton tracking-tight mb-16 text-center">
              MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-600 dark:to-pink-700">
                PROCESS
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "I start by understanding your business goals, target audience, and project requirements.",
                },
                {
                  step: "02",
                  title: "Planning",
                  description:
                    "I create a detailed project plan with timelines, deliverables, and technical specifications.",
                },
                {
                  step: "03",
                  title: "Development",
                  description:
                    "I build your application using modern technologies and best practices, with regular updates.",
                },
                {
                  step: "04",
                  title: "Delivery",
                  description:
                    "I deploy your application, provide training, and offer ongoing support and maintenance.",
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <div className="bg-slate-900/40 dark:bg-slate-200/40 backdrop-blur-sm border border-purple-500/10 dark:border-purple-600/10 hover:border-purple-500/50 dark:hover:border-purple-600/50 transition-all rounded-xl p-6 h-full">
                    <div className="text-5xl font-anton text-purple-500/20 dark:text-purple-600/20 mb-4">
                      {process.step}
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{process.title}</h4>
                    <p className="text-gray-300 dark:text-gray-700">{process.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

