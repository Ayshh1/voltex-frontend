import React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CosmosBackground from '../canvas/CosmosBackground'

gsap.registerPlugin(ScrollTrigger)

const Overview = () => {
  React.useEffect(() => {
    // Animate section on scroll
    const section = document.querySelector('.overview-section')
    
    if (section) {
      gsap.fromTo(section.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-void-black">
      <CosmosBackground />
      
      <div className="relative z-10 pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Security */}
          <section className="overview-section mb-16">
            <h2 className="font-orbitron text-3xl font-bold text-center text-star-white mb-12">
              SECURITY & COMPLIANCE
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-orbitron text-lg font-bold text-star-white mb-3">
                  Bank-Grade Security
                </h3>
                <p className="text-star-white/70 font-syne">
                  Multi-signature wallets and cold storage for maximum protection.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-4">🛡️</div>
                <h3 className="font-orbitron text-lg font-bold text-star-white mb-3">
                  Regulatory Compliant
                </h3>
                <p className="text-star-white/70 font-syne">
                  Full compliance with KYC and AML regulations globally.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="text-3xl mb-4">🔐</div>
                <h3 className="font-orbitron text-lg font-bold text-star-white mb-3">
                  Privacy First
                </h3>
                <p className="text-star-white/70 font-syne">
                  End-to-end encryption and zero-knowledge proofs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Overview
