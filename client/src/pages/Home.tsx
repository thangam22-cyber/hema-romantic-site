import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Stars, BookHeart, CalendarHeart, Film, Gift, Lock, Volume2, VolumeX } from 'lucide-react';
import { LockScreen } from '@/components/LockScreen';
import { Particles } from '@/components/Particles';
import { useHeartbeatAudio } from '@/hooks/use-audio';
import { useToast } from '@/hooks/use-toast';

// === DATA ===
const poems = [
  "Un peyar sollum pothu / En idhayam adhigama thudikkudhu / Adhu bayam illa / Unai paarka aasai nala / Un peyar dhaan en suvaasam / Un peyar dhaan en rhythm",
  "Un kannu paatha odane / Ulagam blur aagudhu / Nee mattum focus / Andha paarvai la oru heat irukku / Adhu en manasai thodudhu / Silent ah kaadhal solludhu",
  "Nee sirikkum pothu / En aasai ezhundhidu / Un lips la varra curve / En nenjathai melt pannudhu / Adhu sirippu illa / Adhu invitation",
  "Un kural ketta / En heartbeat speed aagudhu / Adhu music illa / Adhu en life tone / Un vaarthai ovvondrum / En jeevanai thodudhu",
  "Un pakkathula nikkumbodhu / Distance romba perusa thonudhu / Nerukkam varumbodhu / Udal muzhuvadhum heat / Aana un comfort dhaan / En priority",
  "Un nadai la confidence / En manasa attract pannudhu / Nee nadakkura pothu / Time slow aagudhu / Un shadow kooda / En kooda vara aasai",
  "Un hair wind la aadumbodhu / Adhu cinema scene maari / Aana enakku adhu real / Un azhagu natural ah irundhaal / Adhu dhaan dangerous / En kaadhal strong aagudhu",
  "Un kai thodumbodhu / Current maari irukkum / En moolai la flash / Un sparisam neruppu / Sudama sugam / Adhu dhaan un magic",
  "Un mugam oru nila / En iravu velicham / Un azhagu oru season / Permanent ah en vazhkaila / Nee irundhaal podhum / Enakku vera onnum thevai illa",
  "Un lips pesumbodhu / Kelvi kekka marandhiduven / Un vaarthai softness / En aasaiyai valarthudhu / Adhu paadal maari / En nenju la repeat",
  "Un nerukkam varumbodhu / En heartbeat race / Adhu bayam illa / Unai pidikkum aasai / Un pakkam vara neram / Golden moment",
  "Un sirippu en stress dissolve / Un presence en peace / Un paarvai en weakness / Un azhagu en inspiration / Un anbu en power / Un dhaan en world",
  "Un kannu la oru fire / Aana adhu sudama / Heat tharudhu / Adhu en manasa ignite / Un paarvai la / En vazhkai meaning",
  "Un pakkam vara aasai / Daily adhigam / Un kooda pesanum / Un kooda sirikanum / Un kooda vazhanum / Idhu dhaan en dream",
  "Un azhagu temptation illa / Adhu inspiration / Un udal sirpam / Un manasu deivam / Un dignity dhaan / En kaadhal reason",
  "Un suvaasai thodumbodhu / Amaidhi varudhu / Adhe nerathula heat / Love um desire um / Balance ah un kitta / Adhu dhaan en luck",
  "Un mugam paatha / Automatic smile / Un presence comfort / Un azhagu magnet / En manasu steel illa / Adhu melt aagudhu",
  "Un kai pidikka aasai / Childish ah irukkum / Aana adhu dhaan real / Un nerukkam la dhaan / En manasu settle / Adhu dhaan happiness",
  "Un azhagu en thudippu / Un manasu en vazhkai / Un pakkathula naan / Complete ah feel / Un kooda dhaan / Forever",
  "Un sirippu neruppu / Sugam tharudhu / Un paarvai sparisam / Oliyaagudhu / Un azhagu / Addiction",
  "Un kooda irukka neram / Slow motion / Un anbu permanent / Un azhagu magic / Un kaadhal / En destiny",
  "Hemu… / Un azhagu en idhayam / Un suvaasai en rhythm / Un pakkathula naan / Lifetime iruppen / Unakkaga / Namakkaaga"
];

// === SECTIONS ===
type Section = 'home' | 'heartbeat' | 'eyes' | 'universe' | 'poems' | 'nodate' | 'memory' | 'birthday';

export default function Home() {
  const [locked, setLocked] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>('home');
  const { play, pause, isPlaying } = useHeartbeatAudio();
  const { toast } = useToast();
  
  // Birthday Logic
  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false);
  const [birthdayPassword, setBirthdayPassword] = useState('');
  const [countdown, setCountdown] = useState('');

  // Check date for birthday section
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Target: March 11 of current or next year
      let targetYear = now.getFullYear();
      let target = new Date(targetYear, 2, 11); // Month is 0-indexed (2 = March)
      
      if (now > target && now.getDate() !== 11) {
         target = new Date(targetYear + 1, 2, 11);
      }

      const diff = target.getTime() - now.getTime();
      
      if (now.getMonth() === 2 && now.getDate() === 11) {
        setCountdown('IT IS TIME');
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlockBirthday = () => {
    if (birthdayPassword === "03.01.2024") {
      setBirthdayUnlocked(true);
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "That is not the special date..."
      });
    }
  };

  const menuItems = [
    { id: 'heartbeat', label: 'Heartbeat', icon: Heart, color: 'text-red-400' },
    { id: 'eyes', label: 'Eyes', icon: Eye, color: 'text-blue-300' },
    { id: 'universe', label: 'Multi Universe', icon: Stars, color: 'text-purple-300' },
    { id: 'poems', label: '22 Heartbeat Poems', icon: BookHeart, color: 'text-pink-300' },
    { id: 'nodate', label: 'Love Needs No Date', icon: CalendarHeart, color: 'text-rose-300' },
    { id: 'memory', label: 'Our Memory Video', icon: Film, color: 'text-amber-300' },
    { id: 'birthday', label: 'Birthday Secret', icon: Gift, color: 'text-gold-400' },
  ];

  if (locked) {
    return <LockScreen onUnlock={() => setLocked(false)} onInteract={play} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-foreground selection:bg-primary/30">
      
      {/* Global Audio Control */}
      <button 
        onClick={() => isPlaying ? pause() : play()}
        className="fixed top-4 right-4 z-50 p-3 rounded-full glass-button hover:bg-white/20"
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      <AnimatePresence mode="wait">
        
        {/* === HOME MENU === */}
        {activeSection === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative"
          >
            <Particles count={30} color="bg-rose-200" />
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-script text-white drop-shadow-[0_0_15px_rgba(255,100,150,0.5)] mb-2">
                My World With Hemu
              </h1>
              <p className="font-serif italic text-white/60">Choose a path to explore my heart</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl z-10">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-panel p-6 rounded-xl flex items-center gap-4 group text-left transition-all duration-300 border-white/5 hover:border-primary/30"
                >
                  <div className={`p-3 rounded-full bg-black/20 group-hover:bg-primary/20 transition-colors ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-lg tracking-wide">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* === SECTION: HEARTBEAT === */}
        {activeSection === 'heartbeat' && (
          <SectionLayout key="heartbeat" onClose={() => setActiveSection('home')}>
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-8 relative"
                >
                  <div className="absolute inset-0 bg-red-500 blur-[50px] opacity-20 animate-pulse" />
                  <Heart className="w-32 h-32 fill-red-500 text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  "Your heartbeat is my rhythm.<br/>
                  <span className="text-red-400 font-script">When it beats, my world moves.</span>"
                </h2>
             </div>
          </SectionLayout>
        )}

        {/* === SECTION: EYES === */}
        {activeSection === 'eyes' && (
          <SectionLayout key="eyes" onClose={() => setActiveSection('home')}>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 2 }}
               className="w-full h-full flex flex-col items-center justify-center bg-black"
             >
               <div className="relative w-full h-full">
                 <video 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover"
                    src="/media/eyes.mp4"
                 />
                 <div className="absolute inset-0 bg-black/20 pointer-events-none" />
               </div>
             </motion.div>
          </SectionLayout>
        )}

        {/* === SECTION: UNIVERSE === */}
        {activeSection === 'universe' && (
          <SectionLayout key="universe" onClose={() => setActiveSection('home')}>
             {/* Background Video */}
             <div className="absolute inset-0 z-0 opacity-40">
                <video 
                   autoPlay loop muted playsInline 
                   className="w-full h-full object-cover"
                   src="/media/universe.mp4"
                />
             </div>
             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="glass-panel p-10 rounded-2xl border-white/5 bg-black/40 backdrop-blur-sm"
                >
                  <h2 className="text-3xl md:text-5xl font-display text-purple-100 mb-8">Multi Universe</h2>
                  <p className="text-xl md:text-2xl font-serif italic text-purple-200/90 leading-relaxed">
                    "In every universe,<br/>
                    In every lifetime,<br/>
                    In every version of me,<br/>
                    <span className="text-3xl md:text-4xl block mt-6 font-script text-white gold-text font-bold">I choose you.</span>"
                  </p>
                </motion.div>
             </div>
          </SectionLayout>
        )}

        {/* === SECTION: POEMS === */}
        {activeSection === 'poems' && (
          <SectionLayout key="poems" onClose={() => setActiveSection('home')}>
             <div className="max-w-4xl mx-auto py-20 px-4 md:px-8">
               <h2 className="text-4xl font-script text-center mb-12 gold-text sticky top-0 bg-background/95 backdrop-blur py-4 z-20">22 Heartbeat Poems</h2>
               <div className="space-y-12 pb-20">
                 {poems.map((poem, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="glass-panel p-8 rounded-2xl border-l-4 border-l-pink-500 hover:border-l-pink-400 transition-all"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <span className="font-display text-4xl text-white/10">{(i + 1).toString().padStart(2, '0')}</span>
                       <Heart className="w-5 h-5 text-pink-500/50" />
                     </div>
                     <p className="font-serif text-lg md:text-xl leading-loose text-white/90 whitespace-pre-line">
                       {poem.split('/').map((line, j) => (
                         <span key={j} className="block mb-2">{line.trim()}</span>
                       ))}
                     </p>
                   </motion.div>
                 ))}
               </div>
             </div>
          </SectionLayout>
        )}

        {/* === SECTION: NO DATE === */}
        {activeSection === 'nodate' && (
          <SectionLayout key="nodate" onClose={() => setActiveSection('home')}>
             <Particles count={20} color="bg-rose-500" />
             <div className="flex flex-col items-center justify-center min-h-full p-8 max-w-3xl mx-auto text-center">
                <div className="relative mb-8">
                  <CalendarHeart className="w-20 h-20 text-rose-300" />
                  <motion.div 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Forever
                  </motion.div>
                </div>
                
                <div className="space-y-6 font-serif text-lg md:text-2xl text-rose-100/90 leading-relaxed">
                  <p>February had Rose Day. Propose Day. Hug Day. Kiss Day.</p>
                  <p className="opacity-75 italic">I did not celebrate them.</p>
                  <p>But that does not mean I do not love you.</p>
                  <hr className="w-20 border-rose-500/30 mx-auto my-6"/>
                  <p>The day I see you smile Is my <span className="text-rose-400">Rose Day</span>.</p>
                  <p>The moment you stand near me Is my <span className="text-rose-400">Hug Day</span>.</p>
                  <p>When your eyes meet mine That is my <span className="text-rose-400">Kiss Day</span>.</p>
                  <div className="mt-8 p-6 glass-panel rounded-xl bg-rose-900/20 border-rose-500/20">
                    <motion.p 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-2xl md:text-3xl font-script text-white gold-text"
                    >
                      "Love is not one day. It is every heartbeat.<br/>
                      My love is not for a date. It is forever."
                    </motion.p>
                  </div>
                </div>
             </div>
          </SectionLayout>
        )}

        {/* === SECTION: MEMORY === */}
        {activeSection === 'memory' && (
          <SectionLayout key="memory" onClose={() => setActiveSection('home')}>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 2 }}
               className="w-full h-full flex flex-col items-center justify-center bg-black"
             >
               <div className="relative w-full h-full">
                 <video 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover"
                    src="/media/memory_new.mp4"
                 />
                 <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <p className="text-center font-serif text-2xl text-white/90 tracking-widest uppercase">This is our forever</p>
                 </div>
               </div>
             </motion.div>
          </SectionLayout>
        )}

        {/* === SECTION: BIRTHDAY === */}
        {activeSection === 'birthday' && (
          <SectionLayout key="birthday" onClose={() => setActiveSection('home')}>
             <div className="flex flex-col items-center justify-center min-h-full p-8 max-w-xl mx-auto text-center z-10 relative">
                
                {!birthdayUnlocked ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel p-10 rounded-2xl border-amber-500/20 w-full"
                  >
                    <Gift className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    
                    {countdown === 'IT IS TIME' ? (
                      <div className="space-y-6">
                         <h3 className="text-2xl font-display text-amber-200">The Day Has Arrived</h3>
                         <input 
                           type="text"
                           placeholder="03.01.2024"
                           className="w-full bg-black/50 border border-amber-500/30 rounded-lg px-4 py-3 text-center text-amber-100 placeholder:text-amber-100/30"
                           value={birthdayPassword}
                           onChange={(e) => setBirthdayPassword(e.target.value)}
                         />
                         <button 
                           onClick={handleUnlockBirthday}
                           className="w-full py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-200 rounded-lg border border-amber-500/30 transition-all uppercase tracking-widest text-sm"
                         >
                           Open Gift
                         </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h3 className="text-xl font-serif text-amber-100">Wait for her day...</h3>
                        <div className="text-4xl font-mono text-amber-400 tracking-wider my-8">{countdown}</div>
                        <p className="text-sm text-amber-200/50 uppercase tracking-widest">Something special is hidden</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="glass-panel p-12 rounded-2xl border-amber-500/30 bg-black/60 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <Particles count={50} color="bg-amber-300" />
                    
                    <div className="relative z-10 space-y-8">
                       <h2 className="text-4xl md:text-5xl font-display text-amber-400 drop-shadow-lg">HAPPY BIRTHDAY HEMU</h2>
                       <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent my-6" />
                       <p className="text-xl md:text-3xl font-serif leading-loose text-amber-100">
                         NAAN UNNA VITU POGA MAATEN<br/>
                         EPPAVUM UN KOODAVE IRUPPEN<br/>
                         <span className="text-amber-400 font-bold mt-4 block">UNAKKAGA</span>
                         <span className="text-amber-400 font-bold block">NAMAKKAGA</span>
                         <span className="text-amber-400 font-bold block">NAMMA ETHIRKAALATHUKKAGA</span>
                       </p>
                    </div>
                  </motion.div>
                )}
             </div>
          </SectionLayout>
        )}

      </AnimatePresence>
    </div>
  );
}

// Reusable Section Layout with close button and transition
function SectionLayout({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
      className="fixed inset-0 z-40 bg-background overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-4 left-4 z-50 p-2 rounded-full glass-button hover:bg-white/20 group"
      >
        <span className="text-xs uppercase tracking-widest font-bold px-2 group-hover:pr-4 transition-all">Back</span>
      </button>
      
      {children}
    </motion.div>
  );
}
