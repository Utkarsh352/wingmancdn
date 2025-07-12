# Wingman AI - Your AI Dating Coach & Reply Generator

A comprehensive dating app built with **Next.js 14**, React, and Tailwind CSS. Wingman AI provides two main features: an AI dating coach with multiple personalities and a reply generator for conversations, all using **free AI models** via OpenRouter.

## ✨ Features

### 🎯 Two Main Features

#### 1. **AI Dating Coach**
- **Multiple AI Personalities**: Choose from 5 different dating mindsets
  - Long Term (Marry Her) - Focused on serious relationships
  - Go With The Flow - Casual, natural dating approach
  - Short Term - Meaningful but not long-term relationships
  - Hookup - Casual physical relationships
  - One Night Stand - Single encounter relationships
- **Personalized Advice**: Get coaching tailored to your dating goals
- **Conversation History**: All coaching sessions are saved locally
- **Copy Responses**: One-click copying of AI advice

#### 2. **Reply Generator**
- **Multiple People Tabs**: Manage conversations with different people
- **Text Message UI**: Chat interface that looks like real text messages
- **AI-Generated Replies**: Get contextual replies based on your chosen personality
- **Conversation History**: Track all conversations with each person
- **Easy Message Input**: Paste their messages and get instant replies

### 🎨 Additional Features

- **Beautiful Landing Page**: Stunning design with API key authentication
- **Conversation Management**: Add and manage multiple people
- **Local Storage**: All data persists across browser sessions
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on all devices
- **Settings Panel**: Easy configuration of API keys and personalities
- **Free Models Only**: Uses only free AI models via OpenRouter

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai/keys))

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd wingman
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

5. **Get your API key**
   - Visit [openrouter.ai/keys](https://openrouter.ai/keys)
   - Sign up for a free account
   - Create a new API key
   - Enter it on the landing page to start your dating journey!

## 📱 Usage

### Landing Page

1. **Enter your API key** on the beautiful landing page
2. **Click "Start Your Dating Journey"** to validate and proceed
3. **Get redirected** to the dashboard with both features

### Dashboard Features

#### Dating Coach Tab
1. **Select an AI personality** from the 5 available options
2. **Ask questions** about dating, relationships, or attraction
3. **Get personalized advice** based on your chosen mindset
4. **Copy responses** using the copy button
5. **View conversation history** of all coaching sessions

#### Reply Generator Tab
1. **Add people** using the + button in the sidebar
2. **Select a person** from the conversation list
3. **Paste their message** in the input field
4. **Choose your personality** in settings
5. **Generate a reply** that matches your dating approach
6. **View conversation history** with text message UI

### AI Personalities

| Personality | Description | Best For |
|-------------|-------------|----------|
| **Long Term (Marry Her)** | Focused on building serious, committed relationships | Marriage-minded dating |
| **Go With The Flow** | Casual, natural dating approach | Organic relationship development |
| **Short Term** | Meaningful but not long-term relationships | Quality short-term connections |
| **Hookup** | Casual physical relationships | Clear boundaries, mutual consent |
| **One Night Stand** | Single encounter relationships | One-time experiences |

## 🏗️ Architecture

### Frontend (Next.js 14)
- **App Router**: Modern Next.js 14 app directory structure
- **React 18**: Latest React with hooks for state management
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Beautiful, consistent iconography
- **Local Storage**: Browser-based storage for all data
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Backend (API Routes)
- **Next.js API Routes**: Serverless API endpoints
- **OpenRouter Integration**: Unified API for multiple free LLM providers
- **Personality System**: 5 different AI personalities with specialized prompts
- **Reply Generation**: Contextual reply generation for conversations
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript support for API responses

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Get AI dating coach advice with personality |
| `/api/reply` | POST | Generate contextual replies for conversations |
| `/api/models` | GET | Get list of available free AI models |

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.js`.

### Adding New Personalities
To add new AI personalities, update the `AI_PERSONALITIES` array in `lib/personalities.ts`:

```typescript
export const AI_PERSONALITIES: AIPersonality[] = [
  // Add your new personality here
  {
    id: 'your-personality',
    name: 'Your Personality',
    description: 'Description of the personality',
    color: 'from-color-500 to-color-600',
    systemPrompt: 'Your system prompt here...'
  }
]
```

### Customizing AI Behavior
To modify how the AI acts, edit the system prompts in `lib/personalities.ts` or the API routes in `app/api/chat/route.ts` and `app/api/reply/route.ts`.

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Starts development server with hot reload
```

### Production Build
```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

### Deployment Platforms

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

#### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key (optional - users can provide their own) | No | - |
| `NODE_ENV` | Environment mode | No | development |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Note**: This app uses only free AI models via OpenRouter, so users won't incur any charges when using the service. 