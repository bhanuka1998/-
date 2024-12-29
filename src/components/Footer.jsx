import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0, // Ensures the footer starts at the left edge of the screen
        width: '100vw', // Stretches the footer across the full viewport width
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        margin: 0, // Ensure there's no margin
      }}
    >
      <p>&copy; 2024 Bhanuka Vithanage. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
