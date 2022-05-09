import { useEffect, useState } from "react";
import Header from "./components/header";
import initialEmails from "./data/emails";
import "./styles/app.css";
import "./styles/header.css";
import "./styles/styles.css";

function App() {
  const [initialEmailState, setInitialEmailState] = useState();
  const [emails, setEmails] = useState(initialEmails);
  const [staredEmails, setStaredEmails] = useState(0);
  const [inboxCount, setInboxCount] = useState();
  const [staredCount, setStaredCount] = useState();
  const [currentTab, setCurrentTab] = useState("inbox");

  useEffect(() => {
    setInboxCount(emails.length);
    starredCount();
  }, []);

  const starredCount = () => {
    let count = 0;
    emails.forEach((el) => {
      if (el.starred) count += 1;
    });
    setStaredCount(count);
  };

  const toggleReadUnread = (email) => {
    setInitialEmailState(initialEmails);
    setEmails(
      emails.map((el) => {
        if (el === email) {
          el = el.read ? { ...el, read: false } : { ...el, read: true };
        }
        return el;
      })
    );
  };

  const toggleStar = (email) => {
    const starSelectedGold = emails.map((el) => {
      if (el === email) {
        el = el.starred ? { ...el, starred: false } : { ...el, starred: true };
      }
      return el;
    });
    if (starSelectedGold.length === 0) return setEmails(initialEmailState);
    setStaredEmails(starSelectedGold);
    setEmails(starSelectedGold);
  };

  const renderStaredEmail = () => {
    setCurrentTab("starred");
    setInitialEmailState(initialEmails);
    const filterStaredEmails = emails.filter((el) => {
      return el.starred !== false;
    });

    setEmails(filterStaredEmails);
    setStaredCount(filterStaredEmails.length);
  };

  const renderInbox = () => {
    setCurrentTab("inbox");
    setInboxCount(initialEmailState.length);
    if (staredEmails.length == null) return setEmails(initialEmailState);
    return setEmails(staredEmails);
  };

  const hideReadEmails = () => {
    setInitialEmailState(initialEmails);
    setEmails(
      emails.filter((el) => {
        return el.read !== true;
      })
    );
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "inbox" ? "item active" : "item"}
            onClick={() => {
              renderInbox();
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCount}</span>
          </li>
          <li
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={() => {
              renderStaredEmail();
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{staredCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => {
                hideReadEmails();
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emails.map((email) => {
          return (
            <li
              key={email.id}
              className={email.read ? "email read" : "email unread"}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  onChange={() => toggleReadUnread(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  onChange={() => {
                    toggleStar(email);
                  }}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          );
        })}
      </main>
    </div>
  );
}

export default App;
