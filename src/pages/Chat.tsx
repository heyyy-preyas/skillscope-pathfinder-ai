import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, ArrowLeft, Loader2 } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface MentorInfo {
  full_name: string;
  avatar_url: string;
}

const Chat = () => {
  const { mentorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentorInfo, setMentorInfo] = useState<MentorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchMentorInfo();
    setupRealtimeChat();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [user, mentorId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMentorInfo = async () => {
    try {
      const { data: mentor } = await supabase
        .from("mentors")
        .select("user_id")
        .eq("id", mentorId)
        .single();

      if (mentor) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("user_id", mentor.user_id)
          .single();

        if (profile) {
          setMentorInfo(profile);
        }
      }
    } catch (error) {
      console.error("Error fetching mentor info:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeChat = () => {
    const channel = supabase.channel(`chat-${mentorId}-${user?.id}`);

    channel
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          senderId: payload.senderId,
          text: payload.text,
          timestamp: new Date(payload.timestamp)
        }]);
      })
      .subscribe();

    channelRef.current = channel;
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const message = {
      senderId: user.id,
      text: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    await channelRef.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: message
    });

    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      senderId: user.id,
      text: message.text,
      timestamp: new Date(message.timestamp)
    }]);

    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary-light/20">
      <Navigation />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card border-0 h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/mentors")}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={mentorInfo?.avatar_url || undefined} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {mentorInfo?.full_name?.charAt(0) || "M"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {mentorInfo?.full_name || "Mentor"}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Start a conversation with your mentor
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.senderId === user?.id
                          ? 'bg-gradient-primary text-white'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="border-t border-border/50 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  variant="hero"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
