document.getElementById('search-btn').addEventListener('click', function() {
    const countryName = document.getElementById('country-input').value.trim();
    if (!countryName) return alert('Please enter a country name.');
  
    // Reset previous results
    document.getElementById('flag').src = '';
    document.getElementById('population').textContent = 'Population: N/A';
    document.getElementById('currency').textContent = 'Currency: N/A';
    document.getElementById('language').textContent = 'Language: N/A';
    document.getElementById('capital').textContent = 'Capital City: N/A';
  
    // Call API to fetch country details
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (!response.ok) throw new Error('Country not found');
        return response.json();
      })
      .then(data => {
        const country = data[0];
        
        // Display Flag
        document.getElementById('flag').src = country.flags.png;
        
        // Display Population
        document.getElementById('population').textContent = `Population: ${country.population}`;
        
        // Display Currency
        const currency = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';
        document.getElementById('currency').textContent = `Currency: ${currency}`;
        
        // Display Languages
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        document.getElementById('language').textContent = `Language(s): ${languages}`;
        
        // Display Capital
        document.getElementById('capital').textContent = `Capital City: ${country.capital ? country.capital[0] : 'N/A'}`;
      })
      .catch(error => alert(error.message));
  });
  