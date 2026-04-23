import React from 'react'

const Footer = () => {
  const appName = import.meta.env.VITE_APP_NAME || 'VORTEX'
  const appVersion = import.meta.env.VITE_APP_VERSION || '2.4.1'

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/vortex' },
    { name: 'Discord', icon: '💬', href: 'https://discord.gg/vortex' },
    { name: 'Telegram', icon: '✈️', href: 'https://t.me/vortex' },
    { name: 'GitHub', icon: '🐙', href: 'https://github.com/vortex' }
  ]

  return (
    <footer className="relative bg-void-black border-t border-star-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Brand Section */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nebula-purple via-aurora-cyan to-cosmic-pink animate-spin"></div>
                <span className="font-orbitron text-xl font-bold gradient-text">{appName}</span>
              </div>
              <p className="text-star-white/60 font-syne text-sm leading-relaxed max-w-2xl">
                Navigate the infinite possibilities of decentralized finance with our comprehensive trading and analytics platform.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:glass-card-hover transition-all cursor-pointer transform hover:scale-110"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-star-white/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-star-white/60 font-syne text-sm mb-4 md:mb-0">
              © 2024 VORTEX. All rights reserved. Trading involves risk. Trade responsibly.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gain-green animate-pulse"></div>
                <span className="text-star-white/60 font-syne text-sm">
                  Systems Operational
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-star-white/60 font-syne text-sm">
                  Version
                </span>
                <span className="text-aurora-cyan font-orbitron text-sm font-bold">
                  {appVersion}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nebula-purple via-aurora-cyan to-cosmic-pink opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-nebula-purple/30 rounded-full animate-float"></div>
      <div className="absolute top-20 right-16 w-1 h-1 bg-aurora-cyan/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-cosmic-pink/20 rounded-full animate-pulse"></div>
    </footer>
  )
}

export default Footer
