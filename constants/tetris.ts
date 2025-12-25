export const tetrisInfo = [
  {
    infoType: "Controls",
    title: "How to Play",
    description: "Use your keyboard to play.",
    settings: [
      { button: "ESC/P", action: "Pause the game" },
      { button: "Z", action: "Rotate left" },
      { button: "C", action: "Hold the current piece" },
      { button: "Space", action: "Hard drop" },
      { button: "←", action: "Move left" },
      { button: "→", action: "Move right" },
      { button: "↑", action: "Rotate right" },
      { button: "↓", action: "Soft drop" },
    ],
  },
  {
    infoType: "Score",
    title: "Scoring system",
    info: [
      {
        title: "Soft drop:",
        description: "1 × Distance",
      },
      {
        title: "Hard drop:",
        description: "2 × Distance",
      },
      {
        title: "single line clear:",
        description: "100",
      },
      {
        title: "Double Line Clear:",
        description: "300",
      },
      {
        title: "Triple Line Clear:",
        description: "500",
      },
      {
        title: "T-Spin:",
        description: "400",
      },
      {
        title: "Tetris™ Line Clear:",
        description: "800",
      },
      {
        title: "T-Spin Single:",
        description: "800",
      },
      {
        title: "T-Spin Double:",
        description: "1200",
      },
      {
        title: "T-Spin Triple:",
        description: "1600",
      },
      {
        title: "Back-to-Back:",
        description: "0.5 × Tetris or T-Spin",
      },
    ]
  },
  {
    infoType: "Gameplay",
    title: "General gameplay inforamtion",
    info: [
      {
        title: "Goal",
        description:
          "Put your organizational skills and endurance to the test by clearing as many lines as possible.",
      },
      {
        title: "Clear lines",
        description:
          "Maneuver the falling Tetriminos to fit them together within the Matrix. To clear a line, fill every square within a single row.",
      },
      {
        title: "Score points",
        description:
          "Earn points by clearing lines. Clear multiple lines at once to increase your scoring opportunities.",
      },
      {
        title: "Ghost piece",
        description:
          "Use the Ghost Piece to determine the best fit for the falling Tetrimino. This helpful guide appears directly below the falling Tetrimino and displays possible placements.",
      },
      {
        title: "Newx queue",
        description:
          "Preview the upcoming Tetrimino in the Next Queue to plan ahead and increase your scoring opportunities.",
      },
      {
        title: "Hold queue",
        description:
          "Store a falling Tetrimino in the Hold Queue for later use.",
      },
      {
        title: "Game over",
        description: "Stack the Tetriminos too high and the game is over!",
      },
    ],
  },
  {
    infoType: "About",
    title: "About Tetris",
    info: [
      {
        description:
          "Tetris® is the addictive puzzle game that started it all, embracing our universal desire to create order out of chaos. The Tetris game was created by Alexey Pajitnov in 1984—the product of Alexey's computer programming experience and his love of puzzles. In the decades to follow, Tetris became one of the most successful and recognizable video games, appearing on nearly every gaming platform available. This page is the official destination for free online single-player Tetris. Click PLAY to start playing one of the world's most popular puzzle games now!",
      },
      {
        description:
          "The goal of Tetris is to score as many points as possible by clearing horizontal lines of Blocks. The player must rotate, move, and drop the falling Tetriminos inside the Matrix (playing field). Lines are cleared when they are filled with Blocks and have no empty spaces.",
      },
      {
        description:
          "As lines are cleared, the level increases and Tetriminos fall faster, making the game progressively more challenging. If the Blocks land above the top of the playing field, the game is over.",
      },
    ],
  },
] as const;

export type InfoType = typeof tetrisInfo[number]["infoType"];

