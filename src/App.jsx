import { useEffect, useMemo, useState } from "react";
import MessageRegisterForm from "./components/MessageRegisterForm";
import "./App.css";

const NZ_TIME_ZONE = "Pacific/Auckland";

const toasts = [
  "To Mum, Ma, Nana and GG, the founder of the hour, the keeper of the pause, and the reason 4 o’clockies feels like home.",
  "To Shirley Davidson, whose authority is lifelong, whose seat may never be taken, and whose judgement in all family matters remains final.",
  "To the sacred hour, where glasses are filled, stories are retold, and at least three people may speak at once in perfect family harmony.",
  "To Mum, who listens properly, laughs generously, and somehow makes every subject feel worth talking about.",
  "To the Davidsons, where conversation is limitless, timing is important, and a do-do may be remembered forever.",
  "To 4 o’clockies, proof that the best traditions do not need to be fancy. They just need the right people gathered around.",
  "To Shirley, who has turned an ordinary time of day into a family institution.",
  "To the woman at the centre of it all, loved in every title she carries: Mum, Ma, Nana and GG.",
  "To the first sip, the settled chair, the familiar voices, and the quiet magic of knowing you are exactly where you belong.",
  "To the stories we have heard before, the stories that somehow improve with age, and the stories that begin with, “Oh my god remember when?”",
  "To Mum, whose house is the place people go when they need to talk, laugh, think, be heard, or simply belong for a while.",
  "To the grandkids and great-grandchild, whose attendance improves all meetings and may excuse late arrival.",
  "To laughter, especially the lawful kind caused by mispronunciations, verbal stumbles, guitar chickens, and the occasional triple-do.",
  "To refreshments of every authorised kind, whether served in a glass, can, bottle, mug, or acceptable substitute.",
  "To snacks, never compulsory, always respected, and capable of improving almost any family gathering.",
  "To the conversations that start in one place, wander through six topics, collect three interruptions, and somehow arrive exactly where they needed to.",
  "To Mum, who can listen to a serious worry, encourage a half-formed idea, and laugh at complete nonsense, sometimes all in the same sitting.",
  "To family, where everyone may talk at once and still somehow know exactly what is going on.",
  "To the sacred daily pause, small in time, large in meaning.",
  "To Shirley Davidson, Right Honourable, All-Loving, and not to be overruled without consequences.",
  "To the heat, the cold, the best seat, the wrong seat, and all other matters subject to Mum’s final authority.",
  "To old stories, new plans, unfinished memories, local updates, garden reports, world events, and nonsense of recognised family importance.",
  "To Mum, who makes room for every subject, every person, and every strange little turn the conversation takes.",
  "To the family tradition that grew quietly, one gathering at a time, until it became part of who we are.",
  "To the club members present, absent, late, early, loud, quiet, distracted, snack-bearing, and emotionally accounted for.",
  "To the appointed hour, may it never be missed, rushed, or treated as a minor detail.",
  "To the full glass, the warm welcome, the shared laugh, and the person who made it all feel natural.",
  "To Mum, Ma, Nana and GG, who reminds us that being together is not a small thing.",
  "To all disputed matters, may they be settled wisely, peacefully, and in Mum’s favour.",
  "To The Official 4 O’Clockies Club, established with love, maintained by tradition, and forever under the lifelong authority of Shirley Davidson."
];

const sampleMessages = [
  {
    id: 1,
    name: "Jamie",
    status: "Present and accounted for",
    message:
      "Officially opening proceedings. Glasses inspected, snacks encouraged, authority acknowledged.",
    postedLabel: "Sunday 10 May 2026, 4:01 pm",
    dateGroup: "Sunday 10 May 2026"
  },
  {
    id: 2,
    name: "Taylor",
    status: "Raising a glass from afar",
    message:
      "Happy 4 o’clockies Mum. Love you. Hope the conversation is already out of control.",
    postedLabel: "Sunday 10 May 2026, 4:06 pm",
    dateGroup: "Sunday 10 May 2026"
  },
  {
    id: 3,
    name: "Sam",
    status: "Late but emotionally accounted for",
    message:
      "Running behind, but fully supportive of all refreshments and any snack-related decisions.",
    postedLabel: "Sunday 10 May 2026, 4:18 pm",
    dateGroup: "Sunday 10 May 2026"
  },
  {
    id: 4,
    name: "Morgan",
    status: "Snack debt acknowledged",
    message:
      "Arriving without snacks today, but with sincere regret and a promise to improve.",
    postedLabel: "Sunday 10 May 2026, 4:27 pm",
    dateGroup: "Sunday 10 May 2026"
  },
  {
    id: 5,
    name: "Alex",
    status: "Absent in body, present in spirit",
    message:
      "Thinking of everyone at the sacred hour. Please ensure Mum has the best seat.",
    postedLabel: "Sunday 10 May 2026, 4:42 pm",
    dateGroup: "Sunday 10 May 2026"
  },
  {
    id: 6,
    name: "Jordan",
    status: "Represented by grandchild",
    message:
      "Official representation has been delegated to the smallest available club member.",
    postedLabel: "Saturday 9 May 2026, 4:12 pm",
    dateGroup: "Saturday 9 May 2026"
  },
  {
    id: 7,
    name: "Casey",
    status: "",
    message:
      "A small notice of love, appreciation, and full respect for the final authority.",
    postedLabel: "Saturday 9 May 2026, 4:35 pm",
    dateGroup: "Saturday 9 May 2026"
  }
];

const featureCards = [
  {
    title: "Club Charter",
    subtitle: "Founding document",
    buttonText: "Open Charter",
    modal: "charter"
  },
  {
    title: "Club Rules",
    subtitle: "Terms of membership",
    buttonText: "Review Rules",
    modal: "rules"
  },
  {
    title: "Official Toasts",
    subtitle: "Raise a glass",
    buttonText: "Generate Toast",
    modal: "toast"
  },
  {
    title: "Message Board",
    subtitle: "Latest club notices",
    buttonText: "Open Message Board",
    modal: "messages"
  },
  {
    title: "Mother’s Day Dedication",
    subtitle: "For the woman at the centre of it all",
    buttonText: "Read Dedication",
    modal: "dedication"
  }
];

function getNzParts(date) {
  const formatter = new Intl.DateTimeFormat("en-NZ", {
    timeZone: NZ_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(date);
  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = Number(part.value);
    }
  });

  return values;
}

function getTimeZoneOffset(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-NZ", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(date);
  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = Number(part.value);
    }
  });

  const utcTime = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second
  );

  return utcTime - date.getTime();
}

function makeDateInTimeZone(year, month, day, hour, minute = 0, second = 0) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const offset = getTimeZoneOffset(utcGuess, NZ_TIME_ZONE);

  return new Date(utcGuess.getTime() - offset);
}

function formatDuration(milliseconds) {
  const safeMilliseconds = Math.max(0, milliseconds);
  const totalSeconds = Math.floor(safeMilliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function getSacredHourStatus(now) {
  const nzParts = getNzParts(now);

  const todayOpening = makeDateInTimeZone(
    nzParts.year,
    nzParts.month,
    nzParts.day,
    16
  );
  const todayClosing = makeDateInTimeZone(
    nzParts.year,
    nzParts.month,
    nzParts.day,
    19
  );
  const tomorrowOpening = makeDateInTimeZone(
    nzParts.year,
    nzParts.month,
    nzParts.day + 1,
    16
  );

  if (now < todayOpening) {
    return {
      state: "pending",
      label: "Preparations Underway",
      mainText: "Official opening in:",
      countdown: formatDuration(todayOpening.getTime() - now.getTime())
    };
  }

  if (now >= todayOpening && now < todayClosing) {
    return {
      state: "open",
      label: "4 O’Clockies is Officially Open",
      mainText: "The hour has struck. Proceedings may commence.",
      closingText: "Closing at 7:00 pm"
    };
  }

  return {
    state: "closed",
    label: "Club Closed for the Evening",
    mainText: "Proceedings have concluded.",
    countdown: formatDuration(tomorrowOpening.getTime() - now.getTime())
  };
}

function getRandomToastIndex(currentIndex) {
  if (toasts.length <= 1) {
    return 0;
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * toasts.length);
  }

  return nextIndex;
}

function groupMessagesByDate(messages) {
  return messages.reduce((groups, message) => {
    const existingGroup = groups.find((group) => group.dateGroup === message.dateGroup);

    if (existingGroup) {
      existingGroup.messages.push(message);
      return groups;
    }

    return [
      ...groups,
      {
        dateGroup: message.dateGroup,
        messages: [message]
      }
    ];
  }, []);
}

function App() {
  const [now, setNow] = useState(new Date());
  const [activeModal, setActiveModal] = useState(null);
  const [toastIndex, setToastIndex] = useState(0);

  const sacredHourStatus = useMemo(() => getSacredHourStatus(now), [now]);
  const latestMessages = sampleMessages.slice(0, 5);
  const groupedMessages = groupMessagesByDate(sampleMessages);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function openToastModal() {
    setToastIndex((currentIndex) => getRandomToastIndex(currentIndex));
    setActiveModal("toast");
  }

  function openFeatureModal(modalName) {
    if (modalName === "toast") {
      openToastModal();
      return;
    }

    setActiveModal(modalName);
  }

  function showAnotherToast() {
    setToastIndex((currentIndex) => getRandomToastIndex(currentIndex));
  }

  return (
    <main className="app-shell">
      <header className="club-header">
        <p className="top-label">Davidson Standard Time</p>
        <h1>The Official 4 O’Clockies Club</h1>
        <p className="subtitle">
          Established under the lifelong authority of Shirley Davidson
        </p>
        <p className="role-line">Our Mum, Ma, Nana &amp; GG</p>
      </header>

      <section className="sacred-status-card" aria-label="Sacred Hour Status">
        <div className={`status-badge status-${sacredHourStatus.state}`}>
          {sacredHourStatus.label}
        </div>

        {sacredHourStatus.state === "pending" && (
          <>
            <p className="status-main">{sacredHourStatus.mainText}</p>
            <p className="countdown-display">{sacredHourStatus.countdown}</p>
            <ul className="status-lines">
              <li>Glasses may now be inspected.</li>
              <li>Seating claims may be submitted.</li>
              <li>Snacks are encouraged but not compulsory.</li>
              <li>The sacred hour approaches.</li>
            </ul>
            <div className="status-actions">
              <button type="button" className="primary-button" onClick={openToastModal}>
                Generate Pre-Opening Toast
              </button>
            </div>
          </>
        )}

        {sacredHourStatus.state === "open" && (
          <>
            <p className="status-main open-main">{sacredHourStatus.mainText}</p>
            <ul className="status-lines">
              <li>Thy glass should now be suitably full.</li>
              <li>Conversation may begin, overlap, wander, and improve.</li>
              <li>Mum’s authority is active and final.</li>
            </ul>
            <div className="status-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => setActiveModal("messages")}
              >
                Leave a 4 O’Clockies Message
              </button>
              <button type="button" className="secondary-button" onClick={openToastModal}>
                Raise a Toast
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setActiveModal("messages")}
              >
                Open Message Board
              </button>
            </div>
            <p className="small-note">{sacredHourStatus.closingText}</p>
          </>
        )}

        {sacredHourStatus.state === "closed" && (
          <>
            <p className="status-main">{sacredHourStatus.mainText}</p>
            <p className="closed-copy">
              The sacred pause has been observed, the conversations have wandered,
              and the club shall reopen tomorrow at 4:00 pm.
            </p>
            <p className="next-opening-label">Next official opening in:</p>
            <p className="countdown-display small-countdown">
              {sacredHourStatus.countdown}
            </p>
            <div className="status-actions">
              <button
                type="button"
                className="primary-button"
                onClick={() => setActiveModal("messages")}
              >
                View Message History
              </button>
              <button type="button" className="secondary-button" onClick={openToastModal}>
                Generate Closing Toast
              </button>
            </div>
          </>
        )}
      </section>

      <section className="feature-grid" aria-label="Club features">
        {featureCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <div>
              <h2>{card.title}</h2>
              <p>{card.subtitle}</p>
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => openFeatureModal(card.modal)}
            >
              {card.buttonText}
            </button>
          </article>
        ))}
      </section>

      <section className="message-preview-section" aria-label="Latest Message Board">
        <div className="section-heading">
          <p className="section-kicker">Latest club notices</p>
          <h2>Latest Message Board</h2>
          <p>
            Sample register entries are shown for v0.9. Live posting will be added in
            the Supabase stage.
          </p>
        </div>

        <div className="message-preview-grid">
          {latestMessages.map((message) => (
            <MessageCard key={message.id} message={message} isPreview />
          ))}
        </div>

        <div className="message-preview-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setActiveModal("messages")}
          >
            View Full Message History
          </button>
        </div>
      </section>

      <footer className="club-footer">
        <p>Forever under the lifelong authority of Shirley Davidson.</p>
      </footer>

      {activeModal === "charter" && (
        <Modal title="The Official Club Charter" onClose={() => setActiveModal(null)}>
          <div className="document-copy">
            <p>
              Let it be known that The Official 4 O’Clockies Club exists for the
              preservation of family, refreshment, laughter, conversation, and therein
              the sacred daily pause of the Davidsons.
            </p>
            <p>
              All members are hereby reminded that 4 o’clockies is not merely a time of
              day. It is a tradition, a standard, and a comfort. It is belonging to a
              place in this world where you are accepted, loved, and, at times, laughed
              at mercilessly for a mispronunciation of a word or a slip of the do-do.
            </p>
            <p>
              This club is founded on a simple truth: the best family traditions are not
              planned all at once. They grow quietly, one gathering at a time.
            </p>
            <p>
              Under the lifelong authority of Shirley Davidson, Our Mum, Ma, Nana &amp;
              GG, 4 o’clockies has become more than a time on the clock. It is a small
              daily reminder that family matters, stories matter, laughter matters, and
              being together matters.
            </p>
            <p>
              By order of the family, and with full appreciation for the woman at the
              centre of it all, the Right Honourable and All-Loving Mrs Shirley
              Davidson, this charter is lovingly declared.
            </p>
          </div>
          <button
            type="button"
            className="primary-button modal-bottom-button"
            onClick={() => setActiveModal(null)}
          >
            Acknowledge and Proceed to 4 O’Clockies
          </button>
        </Modal>
      )}

      {activeModal === "rules" && (
        <Modal title="Official Club Rules" onClose={() => setActiveModal(null)}>
          <div className="rules-list">
            <Rule
              title="Rule 1: The Sacred Hour"
              copy="4 o’clockies shall be recognised as a proper and meaningful family observance. Preparations may begin before 4:00 pm, and are in fact encouraged. The official observance shall never commence after 4:00 pm unless authorised by Shirley Davidson herself. At the appointed hour, thy glass shall be ready, willing, and suitably full."
            />
            <Rule
              title="Rule 2: The Authority of Shirley Davidson"
              copy="All matters of refreshments, venue, seating arrangements, temperature, and general comfort remain under the loving authority of Shirley Davidson, Our Mum, Ma, Nana & GG. Members may claim right of dibs to a seat and may raise concerns regarding the heat, but such claims may be overruled by the above authority."
            />
            <Rule
              title="Rule 3: Attendance"
              copy="Members are encouraged to attend whenever possible. Physical attendance is preferred, emotional attendance is accepted, and late attendance may be forgiven if accompanied by a grandchild, great-grandchild, husband, or partner."
            />
            <Rule
              title="Rule 4: Refreshments"
              copy="A glass, can, bottle, or acceptable substitute may be used. The contents are less important than the company, although proper refreshments are strongly encouraged."
            />
            <Rule
              title="Rule 5: Snacks"
              copy="Snacks are not compulsory, but they are highly respected. Any member who brings snacks shall be viewed favourably by the club."
            />
            <Rule
              title="Rule 6: Conversation"
              copy="Conversation shall have no fixed limits, approved categories, or required agenda. Members may discuss anything from family news to history, music, work, gardens, politics, memories, inventions, weather, worries, plans, nonsense, and the general state of the world. The club recognises that people come to 4 o’clockies because serious things are listened to with care, ridiculous things are improved by interruption, and sometimes everyone talking at once is simply proof that the family is in full working order."
            />
            <Rule
              title="Rule 7: Laughter"
              copy="Laughter is expected. Laughing at someone is permitted, and somewhat encouraged, when done with love. This applies especially in the case of mispronunciations, verbal stumbles, or a slip of the do-do. The rare triple-do and guitar chicken incidents shall be regarded as peak examples of lawful family laughter."
            />
            <Rule
              title="Rule 8: No Rushing"
              copy="4 o’clockies shall not be rushed without proper cause. The pause is part of the point."
            />
            <Rule
              title="Rule 9: Family First"
              copy="The club exists because family matters. All members are reminded that being together, even briefly, is the true business of the meeting."
            />
            <Rule
              title="Rule 10: Final Authority"
              copy="In all disputed matters, Mum/Nana is right. If Mum/Nana appears not to be right, members are advised to pause, reflect, and reconsider their position."
            />
          </div>
          <button
            type="button"
            className="primary-button modal-bottom-button"
            onClick={() => setActiveModal(null)}
          >
            Accept Rules and Continue
          </button>
        </Modal>
      )}

      {activeModal === "toast" && (
        <Modal title="Official Toasts" onClose={() => setActiveModal(null)}>
          <div className="toast-card">
            <p>{toasts[toastIndex]}</p>
          </div>
          <button
            type="button"
            className="primary-button modal-bottom-button"
            onClick={showAnotherToast}
          >
            Another Toast
          </button>
        </Modal>
      )}

      {activeModal === "dedication" && (
        <Modal title="Mother’s Day Dedication" onClose={() => setActiveModal(null)}>
          <div className="document-copy dedication-copy">
            <p>To our Mum, Ma, Nana and GG,</p>
            <p>This little club exists because of you.</p>
            <p>
              Not because 4 o’clock is a special time on its own, but because you made
              it special. You made it a reason to pause, gather, talk, laugh, listen,
              remember, interrupt, wander off topic, come back again, and feel like we
              all belong somewhere.
            </p>
            <p>
              You have always had a way of making people feel welcome. We come to you
              with stories, worries, ideas, jokes, memories, plans, questions, and
              complete nonsense, and somehow you make room for all of it. You listen
              properly. You encourage us. You laugh with us. You let the conversation
              go wherever it needs to go.
            </p>
            <p>
              That is what 4 o’clockies really is. It is not just a drink, or a time,
              or a family habit. It is one of the ways your love has shaped this family.
            </p>
            <p>
              So on Mother’s Day, this official club stands in your honour. Under your
              lifelong authority, with full appreciation from every member present,
              absent, late, loud, quiet, snack-bearing, and emotionally accounted for.
            </p>
            <p>Happy Mother’s Day.</p>
            <p>We love you more than words can properly say.</p>
          </div>
          <button
            type="button"
            className="primary-button modal-bottom-button"
            onClick={() => setActiveModal(null)}
          >
            Return to The Club
          </button>
        </Modal>
      )}

      {activeModal === "messages" && (
        <Modal title="Full Message History" onClose={() => setActiveModal(null)}>
          <div className="message-board-intro">
            <p className="section-kicker">Official club register</p>
            <p>
              The message register is being prepared. Sample entries are shown here
              until live posting is connected.
            </p>
          </div>

          <MessageRegisterForm />

          <div className="history-list">
            {groupedMessages.map((group) => (
              <section className="history-group" key={group.dateGroup}>
                <h3>{group.dateGroup}</h3>
                <div className="history-group-messages">
                  {group.messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <button
            type="button"
            className="primary-button modal-bottom-button"
            onClick={() => setActiveModal(null)}
          >
            Return to The Club
          </button>
        </Modal>
      )}
    </main>
  );
}

function Rule({ title, copy }) {
  return (
    <article className="rule-card">
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function MessageCard({ message, isPreview = false }) {
  return (
    <article className={`message-card ${isPreview ? "message-card-preview" : ""}`}>
      <div className="message-card-header">
        <div>
          <h3>{message.name}</h3>
          {message.status && <p className="message-status">{message.status}</p>}
        </div>
        <p className="message-time">{message.postedLabel}</p>
      </div>
      <p className="message-copy">“{message.message}”</p>
    </article>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section
        className="modal-scroll"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label={`Close ${title}`}
          onClick={onClose}
        >
          ×
        </button>
        <div className="modal-heading">
          <p className="top-label">The Official 4 O’Clockies Club</p>
          <h2>{title}</h2>
        </div>
        {children}
      </section>
    </div>
  );
}

export default App;