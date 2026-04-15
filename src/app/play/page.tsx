"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  Info,
  Hand,
} from "lucide-react";

// =====================================================
// BANK SOAL STATIS
// =====================================================
const BANK_SOAL = [
  {
    id: 1,
    question: "Siapa pengetik naskah proklamasi?",
    options: { A: "Sayuti Melik", B: "Soekarno" },
    correctAnswer: "A",
    explanation:
      "Tepat sekali! Sayuti Melik yang mengetik naskahnya menggunakan mesin tik yang dipinjam dari perwakilan Angkatan Laut Jerman.",
  },
  {
    id: 2,
    question: "Di mana lokasi pembacaan teks proklamasi?",
    options: { A: "Jl. Pegangsaan Timur 56", B: "Lapangan IKADA" },
    correctAnswer: "A",
    explanation:
      "Benar! Meskipun awalnya direncanakan di Lapangan IKADA, lokasi dipindah ke Pegangsaan Timur demi keamanan.",
  },
  {
    id: 3,
    question: "Siapa yang menjahit bendera Merah Putih pertama?",
    options: { A: "Ibu Fatmawati", B: "S.K. Trimurti" },
    correctAnswer: "A",
    explanation:
      "Betul! Ibu Fatmawati menjahit bendera Merah Putih pertama dengan penuh kesabaran dan keberanian.",
  },
  {
    id: 4,
    question: "Golongan mana yang mendesak proklamasi segera dilaksanakan?",
    options: { A: "Golongan Muda", B: "Golongan Tua" },
    correctAnswer: "A",
    explanation:
      "Tepat! Para pemuda seperti Wikana dan Chaerul Saleh mendesak Bung Karno agar tidak menunggu janji Jepang.",
  },
  {
    id: 5,
    question: "Siapa pendamping Soekarno saat memproklamasikan kemerdekaan?",
    options: { A: "Mohammad Hatta", B: "Sutan Syahrir" },
    correctAnswer: "A",
    explanation:
      "Luar biasa! Bung Hatta adalah Dwitunggal yang selalu mendampingi Bung Karno.",
  },
];

// =====================================================
// TYPES
// =====================================================
type GameState = "HUNTING" | "EXPLODING" | "QUESTION" | "FEEDBACK" | "FINISHED";

interface FeedbackData {
  isCorrect: boolean;
  explanation: string;
  correctAnswer: string;
}

// =====================================================
// COMPONENT
// =====================================================
export default function GamePage() {
  // ── UI State (drives rendering) ──────────────────────────────
  const [gameState, setGameState] = useState<GameState>("HUNTING");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [crosshairPos, setCrosshairPos] = useState({ x: -200, y: -200 });
  const [isPinching, setIsPinching] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [cameraReady, setCameraReady] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // ── Refs for mutable values accessed inside MediaPipe callbacks ──
  // These shadow the state values so callbacks always see the latest
  // value WITHOUT causing the effect to re-run.
  const gameStateRef = useRef<GameState>("HUNTING");
  const isPinchingRef = useRef(false);
  const questionIndexRef = useRef(0);
  const bgmStartedRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { isPinchingRef.current = isPinching; }, [isPinching]);
  useEffect(() => { questionIndexRef.current = questionIndex; }, [questionIndex]);

  // ── DOM Refs ─────────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement>(null);
  const optionsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Buttons that should be pinch-clickable
  const backBtnRef    = useRef<HTMLAnchorElement | null>(null);
  const audioBtnRef   = useRef<HTMLButtonElement | null>(null);
  const restartBtnRef = useRef<HTMLButtonElement | null>(null);
  const homeBtnRef    = useRef<HTMLAnchorElement | null>(null);

  const currentQuestion = BANK_SOAL[questionIndex];

  // ── Answer checking ──────────────────────────────────────────
  const checkAnswer = useCallback((answer: string) => {
    const q = BANK_SOAL[questionIndexRef.current];
    const isCorrect = answer === q.correctAnswer;

    if (isCorrect) setScore((s) => s + 100);

    setFeedback({
      isCorrect,
      explanation: q.explanation,
      correctAnswer: q.correctAnswer === "A" ? q.options.A : q.options.B,
    });
    setGameState("FEEDBACK");
    gameStateRef.current = "FEEDBACK";

    setTimeout(() => {
      const next = questionIndexRef.current + 1;
      setFeedback(null);
      if (next < BANK_SOAL.length) {
        setQuestionIndex(next);
        questionIndexRef.current = next;
        setGameState("HUNTING");
        gameStateRef.current = "HUNTING";
      } else {
        setGameState("FINISHED");
        gameStateRef.current = "FINISHED";
      }
    }, 4000);
  }, []);

  // ── Helper: hit-test a ref element ──────────────────────────
  const hits = (ref: React.RefObject<HTMLElement | null>, x: number, y: number) => {
    if (!ref.current) return false;
    const r = ref.current.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  // ── Shoot handler ─────────────────────────────────────────────
  const handleShoot = useCallback(
    (x: number, y: number) => {
      const state = gameStateRef.current;

      // ── Back button is always pinch-clickable (any state) ──
      if (hits(backBtnRef, x, y)) {
        window.location.href = "/";
        return;
      }

      // ── Audio Toggle button is always pinch-clickable ──
      if (hits(audioBtnRef, x, y)) {
        const newMutedState = !isAudioMuted;
        setIsAudioMuted(newMutedState);
        const bgm = document.getElementById("bgm-audio") as HTMLAudioElement;
        if (bgm) {
          if (!newMutedState) {
            bgm.volume = 0.4;
            bgm.play().catch((e) => console.log("Toggle play failed:", e));
            bgmStartedRef.current = true;
          } else {
            bgm.pause();
          }
        }
        return;
      }

      // ── Audio logic ──────────────────────────────────────────────
      // Play BGM on first interaction
      if (!bgmStartedRef.current) {
        const bgm = document.getElementById("bgm-audio") as HTMLAudioElement;
        if (bgm && !isAudioMuted) {
          bgm.volume = 0.4;
          bgm.play()
            .then(() => { bgmStartedRef.current = true; })
            .catch((e) => console.log("BGM play failed:", e));
        }
      }

      // Play shoot SFX
      const shootAudio = document.getElementById("shoot-audio") as HTMLAudioElement;
      if (shootAudio && !isAudioMuted) {
        shootAudio.currentTime = 0;
        shootAudio.play().catch((e) => console.log("SFX play failed:", e));
      }

      if (state === "HUNTING") {
        const targetEl = document.getElementById("game-target");
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            setGameState("EXPLODING");
            gameStateRef.current = "EXPLODING";
            setTimeout(() => {
              setGameState("QUESTION");
              gameStateRef.current = "QUESTION";
            }, 900);
          }
        }
      } else if (state === "QUESTION") {
        for (const [key, ref] of Object.entries(optionsRefs.current)) {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
              checkAnswer(key);
              break;
            }
          }
        }
      } else if (state === "FINISHED") {
        // ── Restart ────────────────────────────────────────────
        if (hits(restartBtnRef, x, y)) {
          handleRestart();
          return;
        }
        // ── Go home ────────────────────────────────────────────
        if (hits(homeBtnRef, x, y)) {
          window.location.href = "/";
          return;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkAnswer]
  );

  // ── MediaPipe setup — runs ONCE only ─────────────────────────
  useEffect(() => {
    let stopped = false;
    let cameraInstance: { stop: () => void } | null = null;
    let handsInstance: { close: () => void } | null = null;

    async function setup() {
      try {
        const { Hands } = (await import("@mediapipe/hands")) as any;
        const { Camera } = (await import("@mediapipe/camera_utils")) as any;

        if (stopped) return;

        const hands = new Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        handsInstance = hands;

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results: any) => {
          if (!results.multiHandLandmarks?.length) return;

          const lm = results.multiHandLandmarks[0];

          // Mirror X: webcam is already mirrored via CSS, so un-mirror for coords
          const x = (1 - lm[8].x) * window.innerWidth;
          const y = lm[8].y * window.innerHeight;
          setCrosshairPos({ x, y });

          // Pinch distance between thumb tip (4) and index tip (8)
          const dx = lm[4].x - lm[8].x;
          const dy = lm[4].y - lm[8].y;
          const dz = (lm[4].z ?? 0) - (lm[8].z ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 0.05) {
            // Pinch detected
            if (!isPinchingRef.current) {
              isPinchingRef.current = true;
              setIsPinching(true);
              handleShoot(x, y);
            }
          } else {
            if (isPinchingRef.current) {
              isPinchingRef.current = false;
              setIsPinching(false);
            }
          }
        });

        if (videoRef.current) {
          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              if (videoRef.current && !stopped) {
                await hands.send({ image: videoRef.current });
              }
            },
            width: 640,
            height: 480,
          });
          cameraInstance = camera;
          await camera.start();
          if (!stopped) setCameraReady(true);
        }
      } catch (err) {
        console.error("MediaPipe setup failed:", err);
      }
    }

    setup();

    return () => {
      stopped = true;
      cameraInstance?.stop();
      handsInstance?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← empty deps: setup runs exactly once

  // ── Target movement ───────────────────────────────────────────
  useEffect(() => {
    if (gameState !== "HUNTING") return;
    const id = setInterval(() => {
      setTargetPos({
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
      });
    }, 2200);
    return () => clearInterval(id);
  }, [gameState]);

  // ── Restart ───────────────────────────────────────────────────
  const handleRestart = () => {
    setScore(0);
    setQuestionIndex(0);
    questionIndexRef.current = 0;
    setFeedback(null);
    setGameState("HUNTING");
    gameStateRef.current = "HUNTING";
  };

  // ────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-900 text-white font-sans cursor-none select-none">

      {/* ── Top HUD ──────────────────────────────────────────── */}
      <div className="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-40 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            id="back-btn"
            ref={backBtnRef}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all cursor-pointer"
          >            
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <span className="text-slate-400 text-xs font-black tracking-widest uppercase">
              Misi Sejarah
            </span>
            <span className="text-xl font-black">Gestory Play</span>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {/* Camera indicator */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black border ${
              cameraReady
                ? "bg-green-500/20 border-green-500/40 text-green-300"
                : "bg-yellow-500/20 border-yellow-500/40 text-yellow-300 animate-pulse"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${cameraReady ? "bg-green-400" : "bg-yellow-400"}`}
            />
            {cameraReady ? "SENSOR AKTIF" : "MEMUAT..."}
          </div>

          {/* Score */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-black tabular-nums">{score}</span>
          </div>

          {/* Progress */}
          <div className="bg-blue-600/80 backdrop-blur-md px-5 py-3 rounded-2xl font-black border border-blue-500/50 text-sm">
            SOAL {Math.min(questionIndex + 1, BANK_SOAL.length)}/{BANK_SOAL.length}
          </div>

          {/* Audio Toggle */}
          <button
            id="audio-btn"
            ref={audioBtnRef}
            onClick={() => {
              const newMutedState = !isAudioMuted;
              setIsAudioMuted(newMutedState);
              const bgm = document.getElementById("bgm-audio") as HTMLAudioElement;
              if (bgm) {
                if (!newMutedState) { // User wants to UNMUTE (play)
                  bgm.volume = 0.4;
                  bgm.play().catch((e) => console.log("Toggle play failed:", e));
                  bgmStartedRef.current = true;
                } else { // User wants to MUTE (pause)
                  bgm.pause();
                }
              }
            }}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center justify-center border border-white/10 pointer-events-auto"
            title={isAudioMuted ? "Hidupkan Suara" : "Matikan Suara"}
          >
            <span className="text-xl pointer-events-none">{isAudioMuted ? "🔇" : "🔊"}</span>
          </button>
        </div>
      </div>

      {/* ── Audio Elements ────────────────────────────────────── */}
      <audio id="bgm-audio" src="/assets/bgm.mp3" loop preload="auto" />
      <audio id="shoot-audio" src="/assets/shoot.mp3" preload="auto" />

      {/* ── Game States ──────────────────────────────────────── */}

      {/* STATE: HUNTING */}
      {gameState === "HUNTING" && (
        <div
          id="game-target"
          className="absolute transition-[left,top] duration-700 ease-in-out"
          style={{
            left: `${targetPos.x}%`,
            top: `${targetPos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Outer glow pulse */}
            <div className="absolute w-40 h-40 rounded-full bg-rose-400 opacity-20 animate-ping" />
            <div className="absolute w-32 h-32 rounded-full bg-rose-300 opacity-20 animate-ping" style={{ animationDelay: "0.3s" }} />

            {/* Custom Neon Target CSS */}
            <div className="relative w-[180px] h-[180px] z-10 hover:scale-110 transition-transform duration-300 animate-bounce cursor-pointer flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-rose-500 rounded-full shadow-[0_0_30px_theme(colors.rose.500),inset_0_0_20px_theme(colors.rose.500)]" />
              {/* Inner Ring */}
              <div className="absolute inset-6 border-4 border-amber-400 rounded-full shadow-[0_0_20px_theme(colors.amber.400),inset_0_0_20px_theme(colors.amber.400)] bg-amber-400/5 backdrop-blur-[2px]" />
              
              {/* Central Heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,1)] animate-pulse">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>

              {/* Crosshairs - Vertical */}
              <div className="absolute top-[-15px] left-1/2 w-1.5 h-12 -translate-x-1/2 bg-white shadow-[0_0_10px_white] rounded-full z-20" />
              <div className="absolute bottom-[-15px] left-1/2 w-1.5 h-12 -translate-x-1/2 bg-white shadow-[0_0_10px_white] rounded-full z-20" />
              {/* Crosshairs - Horizontal */}
              <div className="absolute left-[-15px] top-1/2 h-1.5 w-12 -translate-y-1/2 bg-white shadow-[0_0_10px_white] rounded-full z-20" />
              <div className="absolute right-[-15px] top-1/2 h-1.5 w-12 -translate-y-1/2 bg-white shadow-[0_0_10px_white] rounded-full z-20" />
            </div>

            {/* Label */}
            <div className="mt-3 bg-rose-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap shadow-lg">
              🎯 TEMBAK UNTUK SOAL
            </div>
          </div>
        </div>
      )}

      {/* STATE: EXPLODING */}
      {gameState === "EXPLODING" && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          {/* Background flash */}
          <div className="absolute inset-0 bg-orange-500/30 animate-pulse" />

          {/* Explosion rings */}
          <div className="absolute w-96 h-96 rounded-full border-8 border-orange-400 opacity-60 animate-ping" />
          <div className="absolute w-64 h-64 rounded-full border-8 border-yellow-400 opacity-60 animate-ping" style={{ animationDelay: "0.1s" }} />
          <div className="absolute w-80 h-80 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse" />

          <div className="relative text-center z-10">
            <p className="text-8xl mb-4 animate-bounce">💥</p>
            <h2 className="text-6xl font-black text-white drop-shadow-2xl uppercase tracking-widest animate-pulse">
              TARGET KENA!
            </h2>
            <p className="text-xl text-yellow-300 font-bold mt-3 animate-pulse">
              Bersiap untuk soal...
            </p>
          </div>
        </div>
      )}

      {/* STATE: QUESTION */}
      {gameState === "QUESTION" && (
        <div className="absolute inset-0 flex items-center justify-center p-12 z-30">
          <div className="w-full max-w-5xl flex flex-col items-center gap-10">
            {/* Question card */}
            <div className="w-full bg-white/10 backdrop-blur-xl p-10 rounded-[44px] border-2 border-white/20 shadow-2xl text-center">
              <p className="text-slate-300 text-sm font-black uppercase tracking-widest mb-4">
                Pertanyaan {questionIndex + 1} dari {BANK_SOAL.length}
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
                {currentQuestion.question}
              </h2>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1.5 bg-blue-500 rounded-full" />
              </div>
            </div>

            {/* Option boxes */}
            <div className="grid grid-cols-2 gap-10 w-full">
              {/* Option A */}
              <div
                id="option-a"
                ref={(el) => { optionsRefs.current["A"] = el; }}
                className="relative h-60 bg-blue-600 rounded-[44px] shadow-2xl shadow-blue-700/50 flex flex-col items-center justify-center border-b-8 border-blue-800 transition-all cursor-none group"
              >
                <span className="absolute top-5 left-5 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">
                  A
                </span>
                <p className="text-4xl font-black px-8 text-center leading-tight">
                  {currentQuestion.options.A}
                </p>
                {/* Hover guide */}
                <div className="absolute -bottom-5 bg-white text-blue-700 px-4 py-1.5 rounded-full text-xs font-black opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow">
                  👆 CUBIT SINI
                </div>
              </div>

              {/* Option B */}
              <div
                id="option-b"
                ref={(el) => { optionsRefs.current["B"] = el; }}
                className="relative h-60 bg-purple-600 rounded-[44px] shadow-2xl shadow-purple-700/50 flex flex-col items-center justify-center border-b-8 border-purple-800 transition-all cursor-none group"
              >
                <span className="absolute top-5 left-5 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">
                  B
                </span>
                <p className="text-4xl font-black px-8 text-center leading-tight">
                  {currentQuestion.options.B}
                </p>
                <div className="absolute -bottom-5 bg-white text-purple-700 px-4 py-1.5 rounded-full text-xs font-black opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow">
                  👆 CUBIT SINI
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE: FEEDBACK */}
      {gameState === "FEEDBACK" && feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          {/* BG tint */}
          <div
            className={`absolute inset-0 ${
              feedback.isCorrect ? "bg-green-600/80" : "bg-red-600/80"
            } backdrop-blur-sm transition-colors`}
          />

          {/* Card */}
          <div className="relative max-w-3xl w-full bg-white rounded-[48px] p-12 shadow-2xl text-slate-900 border-4 border-white/40 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-28 h-28 text-green-500" />
              ) : (
                <XCircle className="w-28 h-28 text-red-500" />
              )}
            </div>

            {/* Title */}
            <h2
              className={`text-6xl font-black mb-6 ${
                feedback.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback.isCorrect ? "TEMBAKAN JITU! 🎉" : "MELESET! 😅"}
            </h2>

            {/* Explanation */}
            <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-100 mb-6 flex items-start gap-4 text-left">
              <Info className="w-7 h-7 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                {!feedback.isCorrect && (
                  <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-1">
                    Jawaban benar: {feedback.correctAnswer}
                  </p>
                )}
                <p className="text-xl leading-relaxed text-slate-700 font-medium">
                  {feedback.explanation}
                </p>
              </div>
            </div>

            {/* Score gained */}
            {feedback.isCorrect && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-black text-lg mb-6">
                <Trophy className="w-5 h-5 text-yellow-500" />
                +100 Poin!
              </div>
            )}

            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Lanjut ke misi berikutnya dalam 4 detik...
            </p>
          </div>
        </div>
      )}

      {/* STATE: FINISHED */}
      {gameState === "FINISHED" && (
        /* cursor-auto overrides parent cursor-none so mouse clicks work normally */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/95 backdrop-blur-md cursor-auto">
          <div className="max-w-2xl w-full bg-white rounded-[48px] p-12 shadow-2xl text-slate-900 text-center">
            <p className="text-7xl mb-6">🏆</p>
            <h2 className="text-5xl font-black text-slate-900 mb-3">
              Misi Selesai!
            </h2>
            <p className="text-slate-500 text-lg mb-6">
              Kamu telah menaklukkan semua soal sejarah!
            </p>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-8 mb-8 shadow-lg shadow-blue-200">
              <p className="text-sm font-black uppercase tracking-widest opacity-70 mb-2">
                Skor Akhir
              </p>
              <p className="text-7xl font-black tabular-nums">{score}</p>
              <p className="text-blue-200 text-sm mt-2 font-medium">
                dari {BANK_SOAL.length * 100} poin maksimal
              </p>
            </div>

            {/* Pinch hint */}
            <p className="text-slate-400 text-sm font-bold mb-6 flex items-center justify-center gap-2">
              <Hand className="w-4 h-4" />
              Cubit jari di atas tombol untuk memilih, atau klik biasa
            </p>

            <div className="flex gap-4">
              <button
                id="restart-btn"
                ref={restartBtnRef}
                onClick={handleRestart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-95 cursor-pointer"
              >
                🔄 Main Lagi
              </button>
              <Link
                href="/"
                id="home-btn"
                ref={homeBtnRef}
                className="flex-1 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-5 rounded-2xl font-black text-xl transition-all text-center flex items-center justify-center cursor-pointer"
              >
                🏠 Beranda
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Crosshair ─────────────────────────────────────────── */}
      {/* 
        IMPORTANT: We use inline style only for `left` and `top`, and manage
        scale via CSS variable to avoid the transform conflict bug where
        both style={{ transform }} and className={{ scale-* }} fight.
      */}
      <div
        aria-hidden="true"
        id="crosshair"
        className="fixed z-[100] pointer-events-none"
        style={{
          left: crosshairPos.x,
          top: crosshairPos.y,
          transform: `translate(-50%, -50%) scale(${isPinching ? 0.7 : 1})`,
          transition: "transform 80ms ease",
        }}
      >
        {/* Outer ring */}
        <div
          className={`w-10 h-10 rounded-full border-4 ${
            isPinching
              ? "border-yellow-400 bg-yellow-400/30"
              : "border-red-500 bg-red-500/10"
          } transition-colors duration-75`}
        />
        {/* H-line */}
        <div
          className={`absolute top-1/2 left-1/2 h-0.5 w-14 -translate-x-1/2 -translate-y-1/2 ${
            isPinching ? "bg-yellow-400" : "bg-red-500"
          } transition-colors duration-75`}
        />
        {/* V-line */}
        <div
          className={`absolute top-1/2 left-1/2 w-0.5 h-14 -translate-x-1/2 -translate-y-1/2 ${
            isPinching ? "bg-yellow-400" : "bg-red-500"
          } transition-colors duration-75`}
        />
        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${
            isPinching ? "bg-yellow-400" : "bg-red-500"
          } transition-colors duration-75`}
        />
      </div>

      {/* ── PiP Webcam ────────────────────────────────────────── */}
      <div className="fixed bottom-8 right-8 w-52 h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black z-50">
        <video
          ref={videoRef}
          id="webcam-pip"
          className="w-full h-full object-cover scale-x-[-1]"
          playsInline
          muted
          autoPlay
        />
        <div className="absolute top-2 left-2 bg-black/60 px-2.5 py-1 rounded-xl text-[10px] uppercase font-black tracking-wider backdrop-blur-sm">
          📷 Sensor Aktif
        </div>
      </div>

      {/* ── Control hint (bottom-left) ────────────────────────── */}
      <div className="fixed bottom-8 left-8 flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 z-50">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Hand className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-wider text-blue-400 leading-none mb-0.5">
            Kontrol
          </p>
          <p className="text-sm font-bold text-white">
            Cubit jari untuk menembak!
          </p>
        </div>
      </div>
    </div>
  );
}
