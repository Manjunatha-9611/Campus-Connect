const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'frontend/public/images/gallery',
  'frontend/public/images/events',
  'frontend/public/images/clients',
  'frontend/public/images/profiles'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to create an image
function createImage(width, height, text, filename, bgColor = '#2b6cb0', textColor = '#ffffff') {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = textColor;
  ctx.font = `${Math.min(width, height) / 10}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(filename, buffer);
}

// Generate Gallery images
const galleryImages = [
  { name: 'career-fair-2024.jpg', text: 'Career Fair 2024' },
  { name: 'resume-workshop.jpg', text: 'Resume Workshop' },
  { name: 'campus-building.jpg', text: 'Campus Building' },
  { name: 'tech-symposium.jpg', text: 'Tech Symposium' },
  { name: 'leadership-training.jpg', text: 'Leadership Training' },
  { name: 'conference-center.jpg', text: 'Conference Center' },
  { name: 'networking-mixer.jpg', text: 'Networking Mixer' },
  { name: 'study-areas.jpg', text: 'Study Areas' }
];

// Generate Event images
const eventImages = [
  { name: 'career-fair.jpg', text: 'Career Fair' },
  { name: 'tech-workshop.jpg', text: 'Tech Workshop' },
  { name: 'research-symposium.jpg', text: 'Research Symposium' },
  { name: 'student-meetup.jpg', text: 'Student Meetup' },
  { name: 'career-counseling.jpg', text: 'Career Counseling' }
];

// Generate Client logos
const clientLogos = [
  { name: 'tech-innovations.png', text: 'Tech Innovations' },
  { name: 'global-health.png', text: 'Global Health' },
  { name: 'financial-solutions.png', text: 'Financial Solutions' },
  { name: 'creative-media.png', text: 'Creative Media' },
  { name: 'edulearn.png', text: 'EduLearn' },
  { name: 'nextgen-manufacturing.png', text: 'NextGen' }
];

// Generate all images
galleryImages.forEach(img => {
  createImage(800, 600, img.text, `frontend/public/images/gallery/${img.name}`);
});

eventImages.forEach(img => {
  createImage(1200, 800, img.text, `frontend/public/images/events/${img.name}`);
});

clientLogos.forEach(logo => {
  createImage(400, 400, logo.text, `frontend/public/images/clients/${logo.name}`, '#ffffff', '#2b6cb0');
});

console.log('All images have been generated successfully!'); 