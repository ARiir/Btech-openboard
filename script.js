// JavaScript for handling button clicks and link navigation

document.getElementById('submit-new-idea-btn').addEventListener('click', () => {
  alert("Redirecting to the Submit New Idea page...");
  // Here you can implement redirection or display a modal
  // window.location.href = "/submit-idea.html"; // Example redirection
});

document.getElementById('browse-ideas-btn').addEventListener('click', () => {
  alert("Redirecting to Browse Ideas page...");
  // window.location.href = "/browse-ideas.html";
});

document.getElementById('view-trending').addEventListener('click', (e) => {
  e.preventDefault();
  alert("Showing trending ideas...");
  // Logic to load trending ideas or redirect
});

document.getElementById('view-updates').addEventListener('click', (e) => {
  e.preventDefault();
  alert("Showing recent updates...");
  // Logic to load recent updates or redirect
});

document.getElementById('view-profile').addEventListener('click', (e) => {
  e.preventDefault();
  alert("Redirecting to your profile...");
  // window.location.href = "/profile.html";
});

//dashboard//

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT = 3000;

const dashboardData = {
  user: {
    name: "John Smith",
    initials: "JS"
  },
  stats: {
    ideasSubmitted: 12,
    implemented: 3,
    totalUpvotes: 156,
    following: 8
  },
  recentSuggestions: [
    { title: "Smart Parking System", status: "Implemented", upvotes: 45, color: "green" },
    { title: "24/7 Study Rooms", status: "Under Review", upvotes: 32, color: "orange" },
    { title: "Mobile App for Course Registration", status: "In Progress", upvotes: 28, color: "blue" }
  ],
  notifications: [
    { message: "Your suggestion \"Smart Parking System\" has been implemented!", time: "2 hours ago", important: true },
    { message: "New comment on \"24/7 Study Rooms\"", time: "1 day ago", important: false },
    { message: "Campus announcement: New sustainability initiatives", time: "3 days ago", important: false }
  ]
};

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//idea//

document.getElementById('ideaForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = '';

  const ideaData = {
    title: this.title.value.trim(),
    category: this.category.value,
    description: this.description.value.trim(),
    impact: this.impact.value.trim()
  };

  try {
    const response = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ideaData)
    });
    const result = await response.json();

    if (response.ok) {
      formMessage.style.color = 'green';
      formMessage.textContent = 'Idea submitted successfully!';
      this.reset();
    } else {
      formMessage.style.color = 'red';
      formMessage.textContent = result.error || 'Failed to submit idea.';
    }

  } catch (error) {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Server error. Please try again later.';
  }
});


//browse//

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let ideas = [
  {
    id: 1,
    title: "Smart Parking System for Campus",
    author: "Sarah Chen",
    category: "Technology & IT",
    daysAgo: 5,
    description: "Real-time parking availability system using sensors and mobile app integration...",
    votes: 45,
    comments: 12,
    status: "Implemented"
  },
  {
    id: 2,
    title: "Extended Cafeteria Hours",
    author: "Mike Johnson",
    category: "Student Life",
    daysAgo: 3,
    description: "Extend cafeteria operating hours to accommodate students with evening classes and study sessions.",
    votes: 32,
    comments: 8,
    status: "Under Review"
  },
  {
    id: 3,
    title: "Mobile Course Registration App",
    author: "Alex Brown",
    category: "Technology & IT",
    daysAgo: 2,
    description: "Develop a mobile app for easy and fast course registration on the go.",
    votes: 20,
    comments: 5,
    status: "In Progress"
  }
];

// Get all ideas with optional filters and sorting
app.get("/ideas", (req, res) => {
  let filteredIdeas = [...ideas];

  // Filters
  const { search, category, status, sort } = req.query;

  if (search) {
    filteredIdeas = filteredIdeas.filter(i =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category && category !== "All Categories") {
    filteredIdeas = filteredIdeas.filter(i => i.category === category);
  }

  if (status && status !== "All Status") {
    filteredIdeas = filteredIdeas.filter(i => i.status === status);
  }

  // Sorting
  if (sort) {
    if (sort === "Sort by Popularity") {
      filteredIdeas.sort((a, b) => b.votes - a.votes);
    } else if (sort === "Sort by Recent") {
      filteredIdeas.sort((a, b) => a.daysAgo - b.daysAgo);
    }
  }

  res.json(filteredIdeas);
});

// Submit new idea
app.post("/ideas", (req, res) => {
  const { title, author, category, description } = req.body;
  if (!title || !author || !category || !description) {
    return res.status(400).json({ message: "Missing fields." });
  }
  const newIdea = {
    id: ideas.length + 1,
    title,
    author,
    category,
    daysAgo: 0,
    description,
    votes: 0,
    comments: 0,
    status: "Under Review"
  };
  ideas.unshift(newIdea);
  res.status(201).json(newIdea);
});

// Server listen
app.listen(5000, () => console.log("Server running on port 5000"));

//dashboard////

document.addEventListener('DOMContentLoaded', () => {
  // 1. Submit New Idea Button Action
  const submitIdeaBtn = document.getElementById('submitIdeaBtn');
  submitIdeaBtn.addEventListener('click', () => {
    alert('Navigating to the "Submit Idea" form!');
    console.log('Submit New Idea button clicked. Ready for navigation/modal.');
  });
  
  // 2. Voting/Upvote Interaction
  const voteIcons = document.querySelectorAll('.vote-count .material-icons');
  
  voteIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
      const voteSpan = event.target.closest('.vote-count');
      let countElement = voteSpan.childNodes[1]; // The text node containing the number
      let currentVotes = parseInt(countElement.textContent.trim());
      
      // Simple Toggle: if it's already voted (e.g., has the blue color), un-vote it
      if (icon.classList.contains('voted')) {
        icon.classList.remove('voted');
        icon.style.color = ''; // Remove blue color
        countElement.textContent = ' ' + (currentVotes - 1);
        console.log('Un-voted an idea.');
      } else {
        // Vote it
        icon.classList.add('voted');
        icon.style.color = 'var(--primary-blue)'; // Highlight blue
        countElement.textContent = ' ' + (currentVotes + 1);
        console.log('Voted for an idea!');
      }
    });
  });
});

/// log in///

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const formSections = document.querySelectorAll('.form-section');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all tab buttons and form sections
      tabButtons.forEach(btn => btn.classList.remove('active'));
      formSections.forEach(form => form.classList.remove('active'));
      
      // Add 'active' class to the clicked tab button
      button.classList.add('active');
      
      // Get the data-tab attribute to identify which form to show
      const targetTab = button.dataset.tab; // 'login' or 'signup'
      
      // Add 'active' class to the corresponding form section
      const targetForm = document.getElementById(targetTab + 'Form');
      if (targetForm) {
        targetForm.classList.add('active');
      }
    });
  });
  
  // Initialize: ensure the login tab and form are active on load
  document.querySelector('.tab-button[data-tab="login"]').click();
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ideaSubmissionForm');
  
  // Listen for the form submission event
  form.addEventListener('submit', (event) => {
    // Stop the page from reloading when the form is submitted
    event.preventDefault();
    
    // Gather form data
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const impact = document.getElementById('impact').value;
    
    // Perform basic validation
    if (!title || !category || !description) {
      alert('Please fill out all required fields marked with *.');
      return;
    }
    
    // Log the data (what would typically be sent to a server)
    console.log('--- Idea Submission Data ---');
    console.log('Title:', title);
    console.log('Category:', category);
    console.log('Description:', description);
    console.log('Expected Impact:', impact || 'None provided');
    
    // Provide user feedback and reset the form
    alert('Success! Your idea "' + title + '" has been submitted.');
    form.reset();
  });
});


////

document.addEventListener('DOMContentLoaded', () => {
  // Get references to the buttons
  const submitNewIdeaBtn = document.getElementById('submitNewIdeaBtn');
  const browseIdeasBtn = document.getElementById('browseIdeasBtn');
  
  // Add click event listener for "Submit New Idea"
  if (submitNewIdeaBtn) {
    submitNewIdeaBtn.addEventListener('click', () => {
      alert('Navigating to the Submit Idea page!');
      // In a real application, you would change window.location or use a router
      // window.location.href = 'submit-idea.html';
      console.log('Submit New Idea button clicked.');
    });
  }
  
  // Add click event listener for "Browse Ideas"
  if (browseIdeasBtn) {
    browseIdeasBtn.addEventListener('click', () => {
      alert('Navigating to the Browse Ideas page!');
      // In a real application, you would change window.location or use a router
      // window.location.href = 'browse-ideas.html';
      console.log('Browse Ideas button clicked.');
    });
  }
  
  // You can add more JavaScript here for other interactive elements if needed,
  // e.g., dynamically loading activity items, user specific greetings etc.
});