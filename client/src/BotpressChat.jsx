import React, { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Chat with bot",
        "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
        "botId": "dcc6316d-971e-4685-b8ea-6a0fb0215dc8",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "dcc6316d-971e-4685-b8ea-6a0fb0215dc8",
        "webhookId": "758f75ce-b239-45af-b3ae-a9e1af85dbe1",
        "lazySocket": true,
        "themeName": "prism",
        "frontendVersion": "v1",
        "showPoweredBy": true,
        "theme": "prism",
        "themeColor": "#2563eb"
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="botpress-webchat" />
  );
};

export default BotpressChat;
