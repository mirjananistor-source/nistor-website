export function Hero() {
  return (
    <section className="relative bg-navy pt-16 lg:pt-20" style={{ padding: '60px 40px 0px' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/20" />
      
      <div className="relative w-full">
        {/* Single Column Centered Content */}
        <div className="max-w-[900px] mx-auto text-center">
          <p 
            className="uppercase font-medium mb-4"
            style={{ 
              color: '#0D7377', 
              fontSize: '11px', 
              letterSpacing: '2.5px' 
            }}
          >
            AI COO · Za mala i srednja preduzeca
          </p>
          
          <h1 
            className="font-serif text-white leading-tight"
            style={{ 
              fontSize: '48px',
              fontWeight: 400
            }}
          >
            Vaš proizvod zaslužuje operativu koja ga prati — svaki dan
          </h1>
        </div>
      </div>
    </section>
  )
}
