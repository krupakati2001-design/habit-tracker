import { useState } from "react";
import "./App.css";

const initialHabits = [
  { name: "Wake up early", category: "Personal", icon: "🌅" },
  { name: "Drink 2L Water", category: "Health", icon: "💧" },
  { name: "Exercise for 30 minutes", category: "Fitness", icon: "🏃" },
  { name: "Read for 20 minutes", category: "Study", icon: "📚" },
  { name: "Learn AI", category: "Study", icon: "🤖" },
  { name: "Practice Coding", category: "Study", icon: "💻" },
  { name: "Meditate for 10 minutes", category: "Mind", icon: "🧘" },
  { name: "Practice English", category: "Study", icon: "🗣️" },
  { name: "Paint", category: "Creative", icon: "🎨" },
  { name: "Play Music", category: "Creative", icon: "🎵" },
  { name: "Eat Healthy Food", category: "Health", icon: "🥗" },
  { name: "Walk 10,000 Steps", category: "Fitness", icon: "🚶" },
  { name: "Write Journal", category: "Mind", icon: "📖" },
  { name: "Practice Gratitude", category: "Mind", icon: "🙏" },
  { name: "Clean Your Room", category: "Personal", icon: "🧹" },
  { name: "Organize Your Desk", category: "Personal", icon: "🗂️" },
  { name: "Learn Something New", category: "Study", icon: "💡" },
  { name: "Avoid Junk Food", category: "Health", icon: "🍎" },
  { name: "Sleep 7-8 Hours", category: "Health", icon: "😴" },
  { name: "Prepare Tomorrow's Plan", category: "Personal", icon: "📝" },
];

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [completed, setCompleted] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newHabit, setNewHabit] = useState({
    name: "",
    category: "Personal",
    icon: "⭐",
  });

  function toggleHabit(index) {
    if (completed.includes(index)) {
      setCompleted(completed.filter((item) => item !== index));
    } else {
      setCompleted([...completed, index]);
    }
  }

  function addHabit() {
    if (newHabit.name.trim() === "") {
      return;
    }

    setHabits([...habits, newHabit]);

    setNewHabit({
      name: "",
      category: "Personal",
      icon: "⭐",
    });

    setShowModal(false);
  }

  const categories = [
    "All",
    "Health",
    "Fitness",
    "Study",
    "Mind",
    "Creative",
    "Personal",
  ];

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || habit.category === category;

    return matchesSearch && matchesCategory;
  });

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completed.length / habits.length) * 100);

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="logo-section">
          <div className="logo">🌱</div>

          <div>
            <h1>HabitFlow</h1>
            <p>Progress, not perfection.</p>
          </div>
        </div>

        <button
          className="add-button"
          onClick={() => setShowModal(true)}
        >
          + Add Habit
        </button>

      </header>


      {/* MAIN */}

      <main className="container">

        {/* WELCOME */}

        <section className="welcome">

          <div>
            <p className="small-text">GOOD EVENING 👋</p>

            <h2>Build Better Habits</h2>

            <p>
              Stay consistent, track your progress and become
              your best self.
            </p>
          </div>

          <div className="date-box">
            <strong>Today</strong>
            <span>17 November 2026</span>
          </div>

        </section>


        {/* STATS */}

        <section className="stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              🎯
            </div>

            <div>
              <span>Today's Progress</span>

              <strong>
                {completed.length} / {habits.length}
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              🔥
            </div>

            <div>
              <span>Current Streak</span>
              <strong>7 Days</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              🏆
            </div>

            <div>
              <span>Best Streak</span>
              <strong>21 Days</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              ⭐
            </div>

            <div>
              <span>Total Habits</span>
              <strong>{habits.length}</strong>
            </div>

          </div>

        </section>


        {/* PROGRESS */}

        <section className="progress-card">

          <div className="progress-header">

            <div>
              <h3>Today's Progress</h3>

              <p>
                Keep going! Small steps create big results.
              </p>
            </div>

            <strong>{progress}%</strong>

          </div>

          <div className="progress-background">

            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </section>


        {/* HABITS */}

        <section className="habit-section">

          <div className="section-header">

            <div>
              <h2>My Habits</h2>

              <p>
                Complete your habits every day.
              </p>
            </div>

            <span className="habit-count">
              {filteredHabits.length} habits
            </span>

          </div>


          {/* SEARCH */}

          <div className="controls">

            <input
              type="text"
              placeholder="🔍 Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />


            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

          </div>


          {/* CATEGORY BUTTONS */}

          <div className="categories">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item ? "active-category" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>

            ))}

          </div>


          {/* HABIT LIST */}

          <div className="habit-list">

            {filteredHabits.map((habit) => {

              const originalIndex = habits.indexOf(habit);

              const isCompleted =
                completed.includes(originalIndex);

              return (

                <div
                  key={originalIndex}
                  className={`habit-card ${
                    isCompleted ? "completed" : ""
                  }`}
                >

                  <button
                    className="check-button"
                    onClick={() =>
                      toggleHabit(originalIndex)
                    }
                  >
                    {isCompleted ? "✓" : ""}
                  </button>


                  <div className="habit-icon">
                    {habit.icon}
                  </div>


                  <div className="habit-info">

                    <h3>{habit.name}</h3>

                    <span>
                      {habit.category}
                    </span>

                  </div>


                  <div className="habit-status">

                    {isCompleted
                      ? "Completed"
                      : "Pending"}

                  </div>

                </div>

              );
            })}


            {filteredHabits.length === 0 && (

              <div className="empty">

                <div>🔍</div>

                <h3>No habits found</h3>

                <p>
                  Try another search or category.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>


      {/* ADD HABIT MODAL */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Add New Habit</h2>

                <p>
                  Create a habit for your daily routine.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>


            <label>Habit Name</label>

            <input
              className="modal-input"
              placeholder="Example: Drink 2L Water"
              value={newHabit.name}
              onChange={(e) =>
                setNewHabit({
                  ...newHabit,
                  name: e.target.value,
                })
              }
            />


            <label>Category</label>

            <select
              className="modal-input"
              value={newHabit.category}
              onChange={(e) =>
                setNewHabit({
                  ...newHabit,
                  category: e.target.value,
                })
              }
            >

              <option>Personal</option>
              <option>Health</option>
              <option>Fitness</option>
              <option>Study</option>
              <option>Mind</option>
              <option>Creative</option>

            </select>


            <label>Choose Icon</label>

            <div className="icon-picker">

              {[
                "⭐",
                "💧",
                "🏃",
                "📚",
                "🤖",
                "🧘",
                "🎨",
                "🎵",
                "🥗",
                "📝",
              ].map((icon) => (

                <button
                  key={icon}
                  className={
                    newHabit.icon === icon
                      ? "selected-icon"
                      : ""
                  }
                  onClick={() =>
                    setNewHabit({
                      ...newHabit,
                      icon,
                    })
                  }
                >
                  {icon}
                </button>

              ))}

            </div>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={addHabit}
              >
                Add Habit
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;