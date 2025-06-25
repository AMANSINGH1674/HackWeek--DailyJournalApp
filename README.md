# 🌸 Mindful Journal - AI-Powered Daily Journaling

A beautiful, AI-enhanced journaling application that helps you capture thoughts, analyze emotions, and gain insights into your personal journey. Built with React, TypeScript, Supabase, and Google's Gemini AI.

![Mindful Journal](https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 Beautiful Design
- **Elegant UI/UX** inspired by the serene color palette of delicate flowers
- **Responsive design** that works seamlessly across desktop and mobile devices
- **Smooth animations** and micro-interactions for an engaging experience
- **Glass morphism effects** with backdrop blur for a modern aesthetic

### 🤖 AI-Powered Insights
- **Mood Detection** - Automatically analyzes your writing to detect emotional states
- **Smart Summaries** - Generates concise summaries of your journal entries
- **Emotional Intelligence** - Tracks patterns in your emotional journey over time

### 📝 Rich Journaling Experience
- **Distraction-free writing** environment with word count tracking
- **Optional titles** for your entries
- **Real-time AI analysis** as you write
- **Writing inspiration** prompts to help overcome writer's block

### 📊 Personal Timeline
- **Beautiful timeline view** of all your journal entries
- **Advanced search** through your thoughts and reflections
- **Mood filtering** to find entries by emotional state
- **Chronological organization** with elegant date/time displays

### 🔐 Secure & Private
- **User authentication** with Supabase Auth
- **Row-level security** ensures your entries remain private
- **Secure API integration** with encrypted data transmission

## 🚀 Live Demo

Visit the live application: [https://jade-strudel-077eb5.netlify.app](https://jade-strudel-077eb5.netlify.app)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI**: Google Gemini API for mood analysis and summarization
- **Deployment**: Netlify
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project
- A Google AI Studio account for Gemini API access

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindful-journal.git
   cd mindful-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase Database**
   
   Run the migration file in your Supabase SQL editor:
   ```sql
   -- The migration file is located at: supabase/migrations/20250625092633_twilight_tower.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🗄️ Database Schema

The application uses a single table for journal entries:

```sql
journal_entries (
  id: uuid (primary key)
  user_id: uuid (foreign key to auth.users)
  title: text (optional)
  content: text (required)
  mood: text (AI-detected)
  summary: text (AI-generated)
  created_at: timestamptz
  updated_at: timestamptz
)
```

## 🎨 Color Palette

The design is inspired by delicate flowers with a sophisticated color scheme:

- **Deep Navy**: `#153A50` - Primary text and headers
- **Slate Blue**: `#5B8094` - Secondary elements and buttons
- **Soft Blue**: `#7198AF` - Accents and icons
- **Light Blue**: `#87B1C8` - Subtle backgrounds
- **Powder Blue**: `#AAD0E2` - Light accents and borders

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the provided migration to set up the database schema
3. Configure Row Level Security policies (included in migration)
4. Get your project URL and anon key from the API settings

### Gemini AI Setup
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your environment variables

## 📱 Features in Detail

### Writing Experience
- Clean, distraction-free interface
- Real-time word count
- Auto-save functionality
- Writing prompts and inspiration

### AI Analysis
- Mood detection from 12+ emotional states
- Intelligent summarization
- Pattern recognition over time
- Fallback handling when AI is unavailable

### Timeline & Search
- Chronological entry display
- Full-text search across all entries
- Mood-based filtering
- Responsive card layout

### Security
- Email/password authentication
- Row-level security policies
- Secure API key handling
- Data encryption in transit

## 🚀 Deployment

The application is configured for easy deployment on Netlify:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy automatically on push to main branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Minimalist journaling apps and nature photography
- **AI Integration**: Google's Gemini API for natural language processing
- **Database**: Supabase for seamless backend infrastructure
- **Icons**: Lucide React for beautiful, consistent iconography
- **Styling**: Tailwind CSS for rapid, responsive design

## 📞 Support

If you have any questions or need help setting up the project, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ for mindful reflection and personal growth**