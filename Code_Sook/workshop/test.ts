function age(planet:string) : number {
    const earthYearsOfPlanet : {[key:string] : number} = {
      "Mercury" : 0.2408467,
      "Venus" : 0.61519726,
      "Earth" : 1.0,
      "Mars" : 1.8808158,
      "Jupiter" : 11.862615,
      "Saturn" : 29.447498,
      "Uranus" : 84.016846,
      "Neptune" : 164.79132
    };
    
    const inputPlanet = earthYearsOfPlanet[planet.toLowerCase()]; 
  
    return earthYearsOfPlanet[planet] + (inputPlanet * 365.25 * 24 * 60 * 60);
    
  }
  