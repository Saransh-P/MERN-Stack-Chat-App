const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="relative h-64 mb-8">
          {/* Chat bubble icons */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute bg-gradient-to-r from-[#11998E] to-[#38EF7D] bg-opacity-40 animate-float-chat`}
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${15 + Math.floor(i / 4) * 25}%`,
                animationDelay: `${i * 0.3}s`,
                width: '40px',
                height: '30px',
                borderRadius: '12px 12px 12px 12px',
                transform: `rotate(${i % 2 ? 10 : -10}deg)`,
              }}
            >
              {/* Chat bubble tail */}
              <div
                className="absolute bg-gradient-to-r from-[#11998E] to-[#38EF7D] bg-opacity-40"
                style={{
                  width: '8px',
                  height: '8px',
                  bottom: '-4px',
                  left: '4px',
                  borderRadius: '0 0 0 8px',
                  transform: 'rotate(45deg)',
                }}
              />
              
              {/* Message lines */}
              <div className="flex flex-col items-start p-2 gap-1">
                <div className="w-4/5 h-1 bg-gradient-to-r from-[#11998E] to-[#38EF7D] bg-opacity-40 rounded-full" />
                <div className="w-3/5 h-1 bg-gradient-to-r from-[#11998E] to-[#38EF7D] bg-opacity-40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-right-gradient">{title}</h2>
        <p className="text-base-content/60 text-right-gradient">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;