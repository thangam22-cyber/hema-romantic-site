import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Particles } from './Particles';

interface LockScreenProps {
  onUnlock: () => void;
  onInteract: () => void;
}

export function LockScreen({ onUnlock, onInteract }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleUnlock = () => {
    onInteract(); // Start audio
    
    // Hardcoded check as per "lite" request for immediate feedback without network latency
    if (password === "22/2k06/11") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Wrong password… This world belongs to us only ❤️",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white overflow-hidden">
      <Particles count={40} color="bg-amber-200" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 max-w-md w-full mx-4"
      >
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center space-y-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 rounded-full bg-primary/10 border border-primary/20"
          >
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-serif text-white">Protected Realm</h1>
            <p className="text-muted-foreground text-sm">This world belongs only to us ❤️</p>
          </div>

          <motion.div 
            className="w-full space-y-4"
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter our date..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono tracking-widest"
            />
            
            <button
              onClick={handleUnlock}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary/80 to-purple-600/80 text-white font-semibold hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Enter Our World</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
