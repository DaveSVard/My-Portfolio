'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TetrisPiece {
  shape: number[][];
  color: string;
}

interface Position {
  x: number;
  y: number;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETRIS_PIECES: TetrisPiece[] = [
  {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'bg-cyan-500'
  },
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-500'
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'bg-purple-500'
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'bg-green-500'
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'bg-red-500'
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'bg-orange-500'
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'bg-blue-500'
  }
];

export default function ClassicTetris() {
  const [board, setBoard] = useState<string[][]>(() =>
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''))
  );
  const [currentPiece, setCurrentPiece] = useState<TetrisPiece | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [nextPiece, setNextPiece] = useState<TetrisPiece[]>([]);
  const [heldPiece, setHeldPiece] = useState<TetrisPiece | null>(null);
  const [canHold, setCanHold] = useState(true);
  const [clearingRows, setClearingRows] = useState<Set<number>>(new Set());
  const [isClearing, setIsClearing] = useState(false);
  const [scorePopups, setScorePopups] = useState<Array<{ id: number; amount: number; x: number; y: number }>>([]);
  const [levelUpPopups, setLevelUpPopups] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const softDropDistanceRef = useRef(0);
  const hardDropDistanceRef = useRef(0);
  const lastRotationRef = useRef(false);
  const lastActionRef = useRef<'tetris' | 'tspin' | null>(null);
  const scorePopupIdRef = useRef(0);
  const levelUpPopupIdRef = useRef(0);
  const previousLevelRef = useRef(1);
  const isSpawningRef = useRef(false);
  const hasSpawnedFirstPieceRef = useRef(false);
  const movePieceRef = useRef<((direction: 'left' | 'right' | 'down', isUserInput?: boolean) => void) | null>(null);
  const gameOverRef = useRef(false);
  const isPausedRef = useRef(false);

  const getRandomPiece = useCallback((): TetrisPiece => {
    return TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
  }, []);

  const isValidPosition = useCallback((piece: TetrisPiece, pos: Position, board: string[][]): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }

          if (newY >= 0 && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  const placePiece = useCallback((piece: TetrisPiece, pos: Position, board: string[][]): string[][] => {
    const newBoard = board.map(row => [...row]);

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newY >= 0) {
            newBoard[newY][newX] = piece.color;
          }
        }
      }
    }

    return newBoard;
  }, []);

  const clearLines = useCallback((board: string[][]): { newBoard: string[][], linesCleared: number, rowsToClear: number[] } => {
    const rowsToClear: number[] = [];

    // Find which rows need to be cleared
    board.forEach((row, index) => {
      if (!row.some(cell => cell === '')) {
        rowsToClear.push(index);
      }
    });

    if (rowsToClear.length === 0) {
      return { newBoard: board, linesCleared: 0, rowsToClear: [] };
    }

    // Create new board with cleared rows
    const newBoard = board.filter((row, index) => !rowsToClear.includes(index));

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(''));
    }

    return { newBoard, linesCleared: rowsToClear.length, rowsToClear };
  }, []);

  // Detect T-Spin (simplified: check if piece is T-shaped and was rotated recently)
  const detectTSpin = useCallback((piece: TetrisPiece, pos: Position, board: string[][]): boolean => {
    // Check if it's a T-piece (purple)
    if (piece.color !== 'bg-purple-500') return false;

    // Check if it was rotated recently
    if (!lastRotationRef.current) return false;

    // Check if T-piece is in a T-Spin position (surrounded by blocks on 3 sides)
    // This is a simplified check - in real Tetris, T-Spin detection is more complex
    let surroundedSides = 0;
    const centerX = pos.x + 1;
    const centerY = pos.y + 1;

    // Check left
    if (centerX - 1 < 0 || (centerY < BOARD_HEIGHT && centerY >= 0 && board[centerY][centerX - 1])) {
      surroundedSides++;
    }
    // Check right
    if (centerX + 1 >= BOARD_WIDTH || (centerY < BOARD_HEIGHT && centerY >= 0 && board[centerY][centerX + 1])) {
      surroundedSides++;
    }
    // Check bottom
    if (centerY + 1 >= BOARD_HEIGHT || (centerY + 1 < BOARD_HEIGHT && centerY + 1 >= 0 && board[centerY + 1][centerX])) {
      surroundedSides++;
    }

    return surroundedSides >= 2;
  }, []);

  // Show level up popup
  const showLevelUp = useCallback((x: number, y: number) => {
    const popupId = levelUpPopupIdRef.current++;
    setLevelUpPopups(prev => [...prev, { id: popupId, x, y }]);

    // Remove popup after animation
    setTimeout(() => {
      setLevelUpPopups(prev => prev.filter(p => p.id !== popupId));
    }, 2000);
  }, []);

  // Calculate score based on line clears and actions
  const calculateScore = useCallback((
    linesCleared: number,
    isTSpin: boolean,
    softDrop: number,
    hardDrop: number
  ): number => {
    let baseScore = 0;
    let actionType: 'tetris' | 'tspin' | null = null;

    // Soft drop score (only if no lines cleared or no special action)
    if (softDrop > 0 && linesCleared === 0 && !isTSpin) {
      baseScore += softDrop * 1;
    }

    // Hard drop score (only if no lines cleared or no special action)
    if (hardDrop > 0 && linesCleared === 0 && !isTSpin) {
      baseScore += hardDrop * 2;
    }

    // Line clear scores
    if (linesCleared > 0) {
      if (isTSpin) {
        // T-Spin scores
        if (linesCleared === 1) {
          baseScore += 800; // T-Spin Single
          actionType = 'tspin';
        } else if (linesCleared === 2) {
          baseScore += 1200; // T-Spin Double
          actionType = 'tspin';
        } else if (linesCleared === 3) {
          baseScore += 1600; // T-Spin Triple
          actionType = 'tspin';
        }
      } else {
        // Regular line clear scores
        if (linesCleared === 1) {
          baseScore += 100; // Single
        } else if (linesCleared === 2) {
          baseScore += 300; // Double
        } else if (linesCleared === 3) {
          baseScore += 500; // Triple
        } else if (linesCleared === 4) {
          baseScore += 800; // Tetris
          actionType = 'tetris';
        }
      }
    } else if (isTSpin) {
      // T-Spin without line clear
      baseScore += 400;
      actionType = 'tspin';
    }

    // Back-to-back bonus (50% bonus for consecutive Tetris or T-Spin)
    if (actionType && lastActionRef.current === actionType) {
      baseScore = Math.floor(baseScore * 1.5);
    }

    // Update last action
    if (actionType) {
      lastActionRef.current = actionType;
    } else {
      lastActionRef.current = null;
    }

    // Multiply by level
    return baseScore * level;
  }, [level]);

  const spawnNewPiece = useCallback(() => {
    // Prevent double updates
    if (isSpawningRef.current) {
      return;
    }
    isSpawningRef.current = true;

    // Use functional update to ensure we work with the latest state and prevent double updates
    setNextPiece(prevNextPieces => {
      // Take a piece from the queue if available, otherwise get a random one
      let piece: TetrisPiece;
      let updatedNextPieces: TetrisPiece[];

      if (prevNextPieces.length >= 3) {
        // Randomly select one of the 3 pieces
        const randomIndex = Math.floor(Math.random() * prevNextPieces.length);
        piece = prevNextPieces[randomIndex];
        // Remove the selected piece and add a new random piece to maintain 3 pieces
        updatedNextPieces = [
          getRandomPiece(),
          getRandomPiece(),
          getRandomPiece()
        ];
      } else {
        // If queue is empty or incomplete, get a random piece and generate 3 for the queue
        piece = getRandomPiece();
        updatedNextPieces = [getRandomPiece(), getRandomPiece(), getRandomPiece()];
      }

      // Update other state - React will batch these updates
      const spawnPos = { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2), y: 0 };
      setCurrentPiece(piece);
      setCurrentPosition(spawnPos);
      setCanHold(true);
      softDropDistanceRef.current = 0;
      hardDropDistanceRef.current = 0;
      lastRotationRef.current = false;
      // Don't reset lastActionRef - it persists across pieces for back-to-back

      if (!isValidPosition(piece, spawnPos, board)) {
        setGameOver(true);
      }

      // Reset the ref after state updates are queued
      setTimeout(() => {
        isSpawningRef.current = false;
      }, 0);

      return updatedNextPieces;
    });
  }, [board, getRandomPiece, isValidPosition]);

  // Hold piece function
  const holdPiece = useCallback(() => {
    if (!currentPiece || !canHold || gameOver || isPaused) return;

    if (heldPiece) {
      // Swap held piece with current piece
      const temp = heldPiece;
      setHeldPiece(currentPiece);
      setCurrentPiece(temp);
      setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - Math.floor(temp.shape[0].length / 2), y: 0 });
    } else {
      // Hold current piece and spawn next
      setHeldPiece(currentPiece);
      setCurrentPiece(null);
      spawnNewPiece();
    }
    setCanHold(false);
  }, [currentPiece, heldPiece, canHold, gameOver, isPaused, spawnNewPiece]);

  const movePiece = useCallback((direction: 'left' | 'right' | 'down', isUserInput: boolean = false) => {
    if (!currentPiece || gameOverRef.current || isPausedRef.current) return;

    let newPos = { ...currentPosition };

    switch (direction) {
      case 'left':
        newPos.x -= 1;
        break;
      case 'right':
        newPos.x += 1;
        break;
      case 'down':
        newPos.y += 1;
        break;
    }

    if (isValidPosition(currentPiece, newPos, board)) {
      setCurrentPosition(newPos);
      // Track soft drop distance only for user input
      if (direction === 'down' && isUserInput) {
        softDropDistanceRef.current += 1;
      }
    } else if (direction === 'down') {
      const newBoard = placePiece(currentPiece, currentPosition, board);
      const { newBoard: clearedBoard, linesCleared, rowsToClear } = clearLines(newBoard);

      // Detect T-Spin
      const isTSpin = detectTSpin(currentPiece, currentPosition, board);

      // Calculate score using new system
      const scoreAmount = calculateScore(
        linesCleared,
        isTSpin,
        softDropDistanceRef.current,
        0 // No hard drop for soft drop
      );

      // Clear current piece immediately so it doesn't render on top
      setCurrentPiece(null);

      // Update board immediately with the placed piece so animation shows correct state
      setBoard(newBoard);

      if (linesCleared > 0 || isTSpin) {
        // Calculate new level to check for level up immediately
        const newLevel = Math.floor((lines + linesCleared) / 10) + 1;
        const willLevelUp = newLevel > previousLevelRef.current;

        // Start the clearing animation
        setIsClearing(true);
        setClearingRows(new Set(rowsToClear));

        // Calculate center position for score popup (middle of cleared rows or piece position)
        const centerRow = rowsToClear.length > 0
          ? rowsToClear[Math.floor(rowsToClear.length / 2)]
          : currentPosition.y;
        const popupX = BOARD_WIDTH / 2;
        const popupY = centerRow;

        // Show score popup
        const popupId = scorePopupIdRef.current++;
        setScorePopups(prev => [...prev, { id: popupId, amount: scoreAmount, x: popupX, y: popupY }]);

        // Show level up popup immediately if level up will occur
        if (willLevelUp) {
          showLevelUp(popupX, popupY - 2); // Show slightly above score popup
          previousLevelRef.current = newLevel;
        }

        // Remove popup after animation
        setTimeout(() => {
          setScorePopups(prev => prev.filter(p => p.id !== popupId));
        }, 2500);

        // Wait for animation to complete before clearing rows and spawning
        setTimeout(() => {
          setBoard(clearedBoard);
          setLines(prev => prev + linesCleared);
          setScore(prev => prev + scoreAmount);
          setLevel(newLevel);
          setClearingRows(new Set());
          setIsClearing(false);
          // Spawn new piece after animation completes
          spawnNewPiece();
        }, 1200); // Extended animation duration for more beautiful effect
      } else {
        // Update score even if no lines cleared (for soft drop points)
        if (scoreAmount > 0) {
          setScore(prev => prev + scoreAmount);
        }
        // Spawn new piece immediately when no lines cleared
        spawnNewPiece();
      }
    }
  }, [currentPiece, currentPosition, board, isValidPosition, placePiece, clearLines, spawnNewPiece, lines, level, detectTSpin, calculateScore, showLevelUp]);

  // Store movePiece in ref for stable interval
  movePieceRef.current = movePiece;

  const rotatePiece = useCallback((direction: 'left' | 'right' = 'right') => {
    if (!currentPiece || gameOver || isPaused) return;

    let rotated: TetrisPiece;
    if (direction === 'right') {
      // Rotate clockwise
      rotated = {
        ...currentPiece,
        shape: currentPiece.shape[0].map((_, index) =>
          currentPiece.shape.map(row => row[index]).reverse()
        )
      };
    } else {
      // Rotate counter-clockwise
      rotated = {
        ...currentPiece,
        shape: currentPiece.shape[0].map((_, index) =>
          currentPiece.shape.map(row => row[row.length - 1 - index])
        )
      };
    }

    if (isValidPosition(rotated, currentPosition, board)) {
      setCurrentPiece(rotated);
      lastRotationRef.current = true;
      // Reset rotation flag after a short delay
      setTimeout(() => {
        lastRotationRef.current = false;
      }, 500);
    }
  }, [currentPiece, currentPosition, board, isValidPosition, gameOver, isPaused]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const startY = currentPosition.y;
    let newPos = { ...currentPosition };
    let dropDistance = 0;

    while (isValidPosition(currentPiece, { ...newPos, y: newPos.y + 1 }, board)) {
      newPos.y += 1;
      dropDistance += 1;
    }

    hardDropDistanceRef.current = dropDistance;
    setCurrentPosition(newPos);

    // Immediately lock the piece and calculate score
    const newBoard = placePiece(currentPiece, newPos, board);
    const { newBoard: clearedBoard, linesCleared, rowsToClear } = clearLines(newBoard);

    // Detect T-Spin
    const isTSpin = detectTSpin(currentPiece, newPos, board);

    // Calculate score using new system
    const scoreAmount = calculateScore(
      linesCleared,
      isTSpin,
      0, // No soft drop for hard drop
      dropDistance
    );

    // Clear current piece
    setCurrentPiece(null);
    setBoard(newBoard);

    if (linesCleared > 0 || isTSpin) {
      // Calculate new level to check for level up immediately
      const newLevel = Math.floor((lines + linesCleared) / 10) + 1;
      const willLevelUp = newLevel > previousLevelRef.current;

      // Start the clearing animation
      setIsClearing(true);
      setClearingRows(new Set(rowsToClear));

      // Calculate center position for score popup
      const centerRow = rowsToClear.length > 0
        ? rowsToClear[Math.floor(rowsToClear.length / 2)]
        : newPos.y;
      const popupX = BOARD_WIDTH / 2;
      const popupY = centerRow;

      // Show score popup
      const popupId = scorePopupIdRef.current++;
      setScorePopups(prev => [...prev, { id: popupId, amount: scoreAmount, x: popupX, y: popupY }]);

      // Show level up popup immediately if level up will occur
      if (willLevelUp) {
        showLevelUp(popupX, popupY - 2); // Show slightly above score popup
        previousLevelRef.current = newLevel;
      }

      // Remove popup after animation
      setTimeout(() => {
        setScorePopups(prev => prev.filter(p => p.id !== popupId));
      }, 2500);

      // Wait for animation to complete
      setTimeout(() => {
        setBoard(clearedBoard);
        setLines(prev => prev + linesCleared);
        setScore(prev => prev + scoreAmount);
        setLevel(newLevel);
        setClearingRows(new Set());
        setIsClearing(false);
        spawnNewPiece();
      }, 1200);
    } else {
      // Update score even if no lines cleared (for hard drop points)
      if (scoreAmount > 0) {
        setScore(prev => prev + scoreAmount);
      }
      spawnNewPiece();
    }
  }, [currentPiece, currentPosition, board, isValidPosition, placePiece, clearLines, spawnNewPiece, lines, level, gameOver, isPaused, detectTSpin, calculateScore, showLevelUp]);

  const getGhostPosition = useCallback((): Position | null => {
    if (!currentPiece || gameOver || isPaused) return null;

    let ghostPos = { ...currentPosition };
    while (isValidPosition(currentPiece, { ...ghostPos, y: ghostPos.y + 1 }, board)) {
      ghostPos.y += 1;
    }

    // Only return ghost position if it's different from current position
    if (ghostPos.y !== currentPosition.y) {
      return ghostPos;
    }
    return null;
  }, [currentPiece, currentPosition, board, isValidPosition, gameOver, isPaused]);

  const getColorFromClass = useCallback((colorClass: string): { border: string; shadow: string; base: string } => {
    const colorMap: { [key: string]: { border: string; shadow: string; base: string } } = {
      'cyan': { border: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.5)', base: '#06b6d4' },
      'yellow': { border: '#eab308', shadow: 'rgba(234, 179, 8, 0.5)', base: '#eab308' },
      'purple': { border: '#a855f7', shadow: 'rgba(168, 85, 247, 0.5)', base: '#a855f7' },
      'green': { border: '#22c55e', shadow: 'rgba(34, 197, 94, 0.5)', base: '#22c55e' },
      'red': { border: '#ef4444', shadow: 'rgba(239, 68, 68, 0.5)', base: '#ef4444' },
      'orange': { border: '#f97316', shadow: 'rgba(249, 115, 22, 0.5)', base: '#f97316' },
      'blue': { border: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.5)', base: '#3b82f6' }
    };

    for (const [key, value] of Object.entries(colorMap)) {
      if (colorClass.includes(key)) {
        return value;
      }
    }
    return colorMap.blue; // default
  }, []);

  useEffect(() => {
    // Only spawn on initial game start (first piece)
    // Don't spawn when piece locks - that's handled in movePiece
    if (!currentPiece && !gameOver && !hasSpawnedFirstPieceRef.current && !isSpawningRef.current) {
      hasSpawnedFirstPieceRef.current = true;
      spawnNewPiece();
    }
  }, [currentPiece, gameOver, spawnNewPiece]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || isPaused) {
        if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          setIsPaused(!isPaused);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece('left', true);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece('right', true);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece('down', true); // Soft drop
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece('right'); // Rotate right
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          rotatePiece('left'); // Rotate left
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          holdPiece();
          break;
        case ' ':
          e.preventDefault();
          dropPiece(); // Hard drop
          break;
        case 'Escape':
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePiece, dropPiece, holdPiece, isPaused, gameOver]);


  // Keep refs in sync with state
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Automatic falling interval - uses refs to avoid resetting when dependencies change
  useEffect(() => {
    if (gameOver || isPaused) return;

    const interval = setInterval(() => {
      if (movePieceRef.current) {
        movePieceRef.current('down', false); // Automatic falling, not user input
      }
    }, Math.max(100, 1000 - (level - 1) * 100));

    return () => clearInterval(interval);
  }, [level, gameOver, isPaused]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    const ghostPositions = new Set<string>();
    const currentPiecePositions = new Set<string>();
    let isAboutToLock = false;

    // Check if piece is about to lock (can't move down)
    if (currentPiece) {
      isAboutToLock = !isValidPosition(currentPiece, { ...currentPosition, y: currentPosition.y + 1 }, board);
    }

    // Calculate ghost position
    const ghostPos = getGhostPosition();

    // Mark ghost positions
    if (currentPiece && ghostPos) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const newX = ghostPos.x + x;
            const newY = ghostPos.y + y;
            if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
              ghostPositions.add(`${newY}-${newX}`);
            }
          }
        }
      }
    }

    // Render current piece
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const newX = currentPosition.x + x;
            const newY = currentPosition.y + y;
            if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
              displayBoard[newY][newX] = currentPiece.color;
              currentPiecePositions.add(`${newY}-${newX}`);
            }
          }
        }
      }
    }

    return { displayBoard, ghostPositions, currentPiecePositions, isAboutToLock };
  };

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill('')));
    setCurrentPiece(null);
    setCurrentPosition({ x: 0, y: 0 });
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setNextPiece([]);
    setHeldPiece(null);
    setCanHold(true);
    setClearingRows(new Set());
    setIsClearing(false);
    setScorePopups([]);
    setLevelUpPopups([]);
    lastActionRef.current = null;
    previousLevelRef.current = 1;
    softDropDistanceRef.current = 0;
    hardDropDistanceRef.current = 0;
    lastRotationRef.current = false;
    isSpawningRef.current = false;
    hasSpawnedFirstPieceRef.current = false;
  };

  return (
    <div className="flex items-center justify-center p-4 relative">
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-red-500/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-center mb-6"
              >
                <motion.h2
                  className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-500 to-red-500 mb-2"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 100%"
                  }}
                >
                  GAME OVER
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-24 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent mx-auto rounded-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-lg">Final Score:</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="text-2xl font-bold text-yellow-400"
                    >
                      {score.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-lg">Level Reached:</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="text-2xl font-bold text-blue-400"
                    >
                      {level}
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-lg">Lines Cleared:</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                      className="text-2xl font-bold text-green-400"
                    >
                      {lines}
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg"
                >
                  Play Again
                </motion.button>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-gray-400 text-sm mt-2"
                >
                  Press the button or click Reset to start a new game
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-8 max-w-6xl mx-auto w-full">
        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-start"
        >
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={cn("text-sm px-3 py-2 text-white rounded-lg transition-colors", isPaused ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700")}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={resetGame}
              className="text-sm px-3 py-2 text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700"
            >
              Reset
            </button>
          </div>

          <div className="bg-black p-4 rounded-lg shadow-2xl relative">
            <div className="grid grid-cols-10 gap-1">
              {(() => {
                const { displayBoard, ghostPositions, currentPiecePositions, isAboutToLock } = renderBoard();
                return displayBoard.map((row, y) =>
                  row.map((cell, x) => {
                    const isGhost = ghostPositions.has(`${y}-${x}`);
                    const showGhost = isGhost && !cell; // Only show ghost where there's no placed block
                    const isCurrentPieceCell = currentPiecePositions.has(`${y}-${x}`);

                    return (
                      <motion.div
                        key={`${y}-${x}`}
                        className={`w-6 h-6 border border-gray-700 ${cell || 'bg-gray-800'}`}
                        style={{
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Ghost piece skeleton */}
                        {showGhost && currentPiece && (() => {
                          const colors = getColorFromClass(currentPiece.color);
                          return (
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                border: `2px dashed ${colors.border}`,
                                opacity: 0.4,
                                borderRadius: '2px',
                                boxShadow: `0 0 6px ${colors.shadow}, 0 0 12px ${colors.shadow}`
                              }}
                              animate={{
                                opacity: [0.25, 0.55, 0.25],
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: [0.4, 0, 0.6, 1]
                              }}
                            />
                          );
                        })()}
                        {/* Final lock animation - pulse effect when piece is about to lock */}
                        {isCurrentPieceCell && isAboutToLock && currentPiece && (() => {
                          const colors = getColorFromClass(currentPiece.color);
                          // Parse the color to get RGB values for the dimmed version
                          const hexToRgb = (hex: string) => {
                            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? {
                              r: parseInt(result[1], 16),
                              g: parseInt(result[2], 16),
                              b: parseInt(result[3], 16)
                            } : null;
                          };
                          const rgb = hexToRgb(colors.base);
                          const dimmedColor = rgb ? `rgba(${Math.floor(rgb.r / 70)}, ${Math.floor(rgb.g / 70)}, ${Math.floor(rgb.b / 70)}, 0.8)` : colors.base;

                          return (
                            <>
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  backgroundColor: colors.base,
                                  borderRadius: '2px'
                                }}
                                animate={{
                                  backgroundColor: [dimmedColor, colors.base, dimmedColor],
                                  scale: [1, 1.12, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  ease: [0.4, 0, 0.6, 1]
                                }}
                              />
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  borderRadius: '2px',
                                  boxShadow: `0 0 8px ${colors.shadow}, 0 0 16px ${colors.shadow}`
                                }}
                                animate={{
                                  opacity: [0.3, 0.7, 0.3],
                                  scale: [1, 1.15, 1]
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  ease: [0.4, 0, 0.6, 1]
                                }}
                              />
                            </>
                          );
                        })()}
                        {/* Current piece glow effect */}
                        {cell && !clearingRows.has(y) && (
                          <motion.div
                            className={`absolute inset-0 ${cell} opacity-50`}
                            animate={{
                              scale: [1, 1.06, 1],
                              opacity: [0.35, 0.65, 0.35]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: [0.4, 0, 0.6, 1]
                            }}
                            style={{
                              filter: "blur(1.5px)",
                              borderRadius: '2px'
                            }}
                          />
                        )}
                        {clearingRows.has(y) && cell && (
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{
                              x: ["-100%", "100%", "100%"],
                              opacity: [0, 1, 0],
                              scaleY: [1, 1.6, 1]
                            }}
                            transition={{
                              duration: 1.2,
                              ease: [0.4, 0, 0.2, 1],
                              times: [0, 0.35, 1]
                            }}
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
                              filter: "blur(0.5px)"
                            }}
                          />
                        )}
                        {clearingRows.has(y) && cell && (
                          <motion.div
                            className={`absolute inset-0 ${cell} rounded-sm`}
                            animate={{
                              scale: [1, 1.4, 1.1, 0],
                              opacity: [1, 1, 0.9, 0],
                              rotate: [0, 90, 180, 270, 360],
                              y: [0, -3, -1, 3],
                              filter: ["brightness(1)", "brightness(2)", "brightness(1.5)", "brightness(0.5)"]
                            }}
                            transition={{
                              duration: 1.2,
                              ease: [0.34, 1.56, 0.64, 1],
                              times: [0, 0.25, 0.65, 1]
                            }}
                            style={{
                              boxShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)"
                            }}
                          />
                        )}
                        {clearingRows.has(y) && cell && (
                          <motion.div
                            className="absolute inset-0 bg-white rounded-sm"
                            initial={{ scale: 0, opacity: 0, rotate: 0 }}
                            animate={{
                              scale: [0, 1.8, 1.2, 0],
                              opacity: [0, 0.8, 0.4, 0],
                              rotate: [0, 180, 360]
                            }}
                            transition={{
                              duration: 1.2,
                              ease: [0.34, 1.56, 0.64, 1],
                              times: [0, 0.3, 0.7, 1]
                            }}
                            style={{
                              borderRadius: "2px",
                              filter: "blur(1px)"
                            }}
                          />
                        )}
                        {clearingRows.has(y) && cell && (
                          <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{
                              scale: [1, 1.2, 0.8, 0],
                              opacity: [0, 1, 0.5, 0]
                            }}
                            transition={{
                              duration: 1.2,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.6, 1]
                            }}
                            style={{
                              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
                              borderRadius: "2px"
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })
                );
              })()}
            </div>
          </div>

          {/* Score Popups */}
          <AnimatePresence>
            {scorePopups.map((popup) => (
              <motion.div
                key={popup.id}
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1.1, 0.8],
                  y: [-20, -40, -50],
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 2.5,
                  ease: [0.34, 1.56, 0.64, 1],
                  times: [0, 0.2, 0.8, 1]
                }}
                className="absolute pointer-events-none"
                style={{
                  top: `${popup.y * 24 + 16 + 64}px`,
                  left: `${popup.x * 24 + 16}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000
                }}
              >
                <motion.div
                  className="bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black font-bold text-lg px-4 py-2 rounded-lg shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 193, 7, 0.5)",
                      "0 0 20px rgba(255, 193, 7, 0.8)",
                      "0 0 10px rgba(255, 193, 7, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    border: "2px solid rgba(255, 255, 255, 0.8)"
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    +{popup.amount.toLocaleString()}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Level Up Popups */}
          <AnimatePresence>
            {levelUpPopups.map((popup) => (
              <motion.div
                key={popup.id}
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1.1, 0.8],
                  y: [-20, -40, -50],
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 2,
                  ease: [0.34, 1.56, 0.64, 1],
                  times: [0, 0.2, 0.8, 1]
                }}
                className="absolute pointer-events-none"
                style={{
                  top: `${popup.y * 24 + 16 + 64}px`,
                  left: `${popup.x * 24 + 16}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2000
                }}
              >
                <motion.div
                  className="bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-bold text-2xl px-6 py-3 rounded-lg shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(168, 85, 247, 0.6)",
                      "0 0 30px rgba(168, 85, 247, 0.9)",
                      "0 0 15px rgba(168, 85, 247, 0.6)"
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    textShadow: "0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.5)",
                    border: "2px solid rgba(255, 255, 255, 0.9)"
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Level Up!
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Game Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6 justify-between self-end"
        >
          <div className="bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Hold block</h2>
            <div className="flex flex-col gap-y-2 items-center justify-center bg-black p-4 rounded min-h-[80px]">
              {heldPiece ? (
                <div className="grid gap-0.5 w-fit" style={{ gridTemplateColumns: `repeat(${heldPiece.shape[0].length}, 1fr)` }}>
                  {heldPiece.shape.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${y}-${x}`}
                        className={`w-4 h-4 ${cell ? heldPiece.color : 'bg-transparent'}`}
                      />
                    ))
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Press C to hold</div>
              )}
            </div>
          </div>

          <motion.div
            className="bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 shadow-2xl"
            animate={isClearing ? {
              boxShadow: [
                "0 0 20px rgba(79, 70, 229, 0.3)",
                "0 0 40px rgba(79, 70, 229, 0.6)",
                "0 0 20px rgba(79, 70, 229, 0.3)"
              ]
            } : {}}
            transition={{ duration: 0.5, repeat: isClearing ? Infinity : 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Score</h2>
            <div className="space-y-2">
              <motion.div
                className="text-white"
                animate={isClearing ? { color: ["#ffffff", "#4f46e5", "#ffffff"] } : {}}
                transition={{ duration: 0.3, repeat: isClearing ? Infinity : 0 }}
              >
                <span className="text-gray-400">Score:</span> {score.toLocaleString()}
              </motion.div>
              <div className="text-white">
                <span className="text-gray-400">Level:</span> {level}
              </div>
              <motion.div
                className="text-white"
                animate={isClearing ? { color: ["#ffffff", "#10b981", "#ffffff"] } : {}}
                transition={{ duration: 0.3, repeat: isClearing ? Infinity : 0 }}
              >
                <span className="text-gray-400">Lines:</span> {lines}
              </motion.div>
            </div>
          </motion.div>

          <div className="bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Next</h2>
            <div className="flex flex-col gap-y-2 items-center justify-center bg-black p-4 rounded min-h-[150px]">
              {nextPiece.map((piece, idx) => (
                <div key={idx} className="grid gap-0.5 w-fit" style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)` }}>
                  {piece.shape.map((row, y) =>
                    row.map((cell, x) => (
                      <div
                        key={`${y}-${x}`}
                        className={`w-4 h-4 ${cell ? piece.color : 'bg-transparent'}`}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
