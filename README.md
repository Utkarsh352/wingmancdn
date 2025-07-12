# Wingman AI - Your AI Conversation Partner

A modern, responsive AI chat application built with **Next.js 14**, React, and Tailwind CSS. Wingman AI supports multiple large language models (LLMs) through OpenRouter, providing a seamless conversational experience with local storage for conversation history.

## ✨ Features

- 🎨 **Beautiful Landing Page**: Stunning design with API key authentication flow
- 🤖 **Multiple AI Models**: Support for GPT-4, Claude, Llama, Mistral, Gemini, Grok, and more via OpenRouter
- 💬 **Real-time Chat**: Clean, minimalistic chat interface with typing indicators
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes
- 💾 **Local Storage**: Conversation history persists across browser sessions
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication**: API key validation before accessing the chat
- ⚙️ **Settings Panel**: Easy configuration of API keys and model preferences
- 📋 **Copy to Clipboard**: One-click copying of AI responses
- 🔄 **Model Switching**: Seamlessly switch between different AI models
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and Lucide icons

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
   - Enter it on the landing page to start chatting!

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key (optional - users can provide their own) | No | - |
| `NODE_ENV` | Environment mode | No | development |

### Getting an OpenRouter API Key

1. Visit [openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and enter it on the landing page

## 📱 Usage

### Landing Page

1. **Enter your API key** on the beautiful landing page
2. **Click "Start Chatting"** to validate and proceed
3. **Get redirected** to the chat interface

### Chat Interface

1. **Select an AI model** from the dropdown menu
2. **Type your message** in the text area
3. **Press Enter** to send (or Shift+Enter for new line)
4. **Wait for the AI response** with loading indicators
5. **Copy responses** using the copy button
6. **Switch models** anytime during your conversation

### Features

- **Model Switching**: Change AI models anytime during your conversation
- **Dark Mode**: Toggle between light and dark themes using the moon/sun icon
- **Copy Responses**: Click the copy icon on any AI response to copy it to clipboard
- **Clear History**: Use the "Clear History" button in settings to start fresh
- **Persistent Storage**: Your conversations are automatically saved and restored
- **Settings Panel**: Access via the gear icon to manage API keys and preferences
- **Logout**: Use the logout button to clear your API key and return to landing page

## 🏗️ Architecture

### Frontend (Next.js 14)
- **App Router**: Modern Next.js 14 app directory structure
- **React 18**: Latest React with hooks for state management
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Beautiful, consistent iconography
- **Local Storage**: Browser-based storage for conversation history
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Backend (API Routes)
- **Next.js API Routes**: Serverless API endpoints
- **OpenRouter Integration**: Unified API for multiple LLM providers
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript support for API responses

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send a message and get AI response |
| `/api/models` | GET | Get list of available AI models |

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by modifying the Tailwind configuration in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Add your custom colors here
        }
      }
    }
  }
}
```

### Adding New Models
To add support for new AI models, update the `DEFAULT_MODELS` array in `lib/utils.ts`:

```typescript
export const DEFAULT_MODELS = [
  // Add your new model here
  { id: 'provider/model-name', name: 'Display Name', provider: 'Provider' }
]
```

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
1. Connect your repository to Vercel
2. Deploy automatically on push
3. Set environment variables in Vercel dashboard if needed

#### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy automatically on push

#### Railway
1. Connect your repository to Railway
2. Set environment variables
3. Deploy automatically

### Environment Variables for Production
Make sure to set these in your deployment platform if needed:
- `OPENROUTER_API_KEY` (optional - users can provide their own)
- `NODE_ENV=production`

## 🔒 Security

- API keys are stored securely in browser localStorage
- No sensitive data is exposed in the frontend code
- API key validation before accessing chat features
- Secure API communication with OpenRouter
- Input validation and sanitization implemented

## 🐛 Troubleshooting

### Common Issues

**"Invalid API key" error**
- Verify your OpenRouter API key is correct
- Check that the key starts with "sk-"
- Ensure the key has sufficient credits/quota

**"Failed to load models" error**
- Check your internet connection
- Verify the OpenRouter API is accessible
- The app will fall back to default models if the API is unavailable

**Messages not saving**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Ensure you're not in incognito/private browsing mode

**Server won't start**
- Verify Node.js version (v18+ required)
- Check if port 3000 is already in use
- Ensure all dependencies are installed

### Getting Help

1. Check the browser console for error messages
2. Verify your OpenRouter API key is valid
3. Test the API connection using the models endpoint
4. Check the server logs for detailed error information

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) for providing access to multiple AI models
- [Next.js](https://nextjs.org) for the amazing React framework
- [React](https://reactjs.org) for the frontend library
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Lucide](https://lucide.dev) for the beautiful icons

---

**Happy chatting with Wingman AI! 🚀** 