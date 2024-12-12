module.exports = {
    generateInvoiceNumber(sequence) {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0
        const day = String(now.getDate()).padStart(2, '0');
        const datePart = `${day}${month}${year}`;
      
        const sequencePart = String(sequence).padStart(3, '0');
      
        return `INV${datePart}-${sequencePart}`;
     }
}