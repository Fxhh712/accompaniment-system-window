document.addEventListener("DOMContentLoaded", () => {
  /**
   * 角色数据
   * 如果你后续想改文案，只改这里即可。
   * 注意：人物立绘统一走 images/ 文件夹。
   */
  const characters = {
    gushiye: {
      name: "顾时夜",
      avatar: "images/gushiye.PNG",
      welcome:
        "晚上好。先不用急着证明什么，我会在这里，陪你把今天一点点完成。",
      status: "正在陪你学习",
      chat: [
        "我在。先从最简单的一步开始。",
        "别急，今天只要完成一小段，就已经很好。",
        "如果走神了，也不用责备自己，慢慢把注意力带回来。",
      ],
    },
    yiyu: {
      name: "易遇",
      avatar: "images/yiyu.PNG",
      welcome:
        "今天也辛苦了。慢一点没关系，我会陪你把节奏重新找回来。",
      status: "温柔陪伴中",
      chat: [
        "先深呼吸一下，好吗？",
        "这一页看完，我们就休息几分钟。",
        "你不用一下子做到最好，能继续就已经很棒了。",
      ],
    },
    baiyuan: {
      name: "白远",
      avatar: "images/baiyuan.PNG",
      welcome:
        "把今天拆成几步，会轻松很多。别怕慢，我陪你稳稳往前走。",
      status: "正在整理计划",
      chat: [
        "先做最容易的一件事。",
        "任务太多的时候，就先把它们拆开。",
        "你已经在往前走了，这就足够重要。",
      ],
    },
    xiaxiaoyin: {
      name: "夏小音",
      avatar: "images/xiaxiaoyin.PNG",
      welcome:
        "如果累了，就先休息一下。你不是机器，也需要被好好照顾。",
      status: "正在陪你放松",
      chat: [
        "先把肩膀放下来。",
        "休息不是浪费时间，是恢复能量。",
        "等你准备好了，我们再继续。",
      ],
    },
  };

  /**
   * 模式数据
   * 注意：场景素材统一走 current/ 文件夹。
   */
  const modes = {
    study: {
      label: "伴学模式",
      sideText: "伴学中",
      scene: "current/study.PNG",
      title: "今晚，先完成一段真正的积累。",
      subtitle: "他在这里，陪你把今天慢慢推进。",
      timer: 25 * 60,
      hint: "专注时长 25 分钟",
      focusLabel: "FOCUS TIMER",
    },
    sport: {
      label: "运动模式",
      sideText: "运动中",
      scene: "current/sport.PNG",
      title: "先动起来，状态就会慢慢回来。",
      subtitle: "一点点活动身体，也是在照顾自己。",
      timer: 10 * 60,
      hint: "轻运动 10 分钟",
      focusLabel: "MOVE TIMER",
    },
    rest: {
      label: "休息模式",
      sideText: "休息中",
      scene: "current/rest.PNG",
      title: "先让心安静下来，再继续也不迟。",
      subtitle: "休息不是停下，是为了更稳地继续。",
      timer: 5 * 60,
      hint: "休息 5 分钟",
      focusLabel: "REST TIMER",
    },
    talk: {
      label: "对话模式",
      sideText: "对话中",
      scene: "current/talk.PNG",
      title: "如果今天有点累，也可以先说出来。",
      subtitle: "我会在这里听你慢慢说。",
      timer: 0,
      hint: "情绪对话",
      focusLabel: "CHAT MODE",
    },
  };

  let currentCharacterKey = "gushiye";
  let currentModeKey = "study";

  let timerDuration = modes.study.timer;
  let timerRemaining = timerDuration;
  let timerRunning = false;
  let timerId = null;

  let typingId = null;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const welcomeScreen = $("#welcomeScreen");
  const appShell = $("#appShell");

  const welcomeScene = $("#welcomeScene");
  const welcomePortrait = $("#welcomePortrait");
  const typewriterText = $("#typewriterText");
  const enterBtn = $("#enterBtn");

  const sideAvatar = $("#sideAvatar");
  const sideName = $("#sideName");
  const sideStatus = $("#sideStatus");
  const todayModeText = $("#todayModeText");
  const sideProgressText = $("#sideProgressText");

  const viewScene = $("#viewScene");
  const modeTitle = $("#modeTitle");
  const modeSubtitle = $("#modeSubtitle");
  const currentModePill = $("#currentModePill");

  const focusPanel = $("#focusPanel");
  const chatPanel = $("#chatPanel");

  const consolePortrait = $("#consolePortrait");
  const timerDisplay = $("#timerDisplay");
  const timerHint = $("#timerHint");
  const focusLabel = $("#focusLabel");
  const progressBar = $("#progressBar");
  const toggleTimer = $("#toggleTimer");


  const chatAvatar = $("#chatAvatar");
  const chatName = $("#chatName");
  const chatList = $("#chatList");
  const chatInput = $("#chatInput");
  const sendBtn = $("#sendBtn");

  const toastLayer = $("#toastLayer");

  function showToast(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
    toastLayer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 1900);
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function typeText(text) {
    clearInterval(typingId);
    typewriterText.textContent = "";

    let index = 0;

    typingId = setInterval(() => {
      typewriterText.textContent += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(typingId);
      }
    }, 42);
  }

  function softImageChange(imgEl, src) {
    imgEl.style.opacity = "0";

    setTimeout(() => {
      imgEl.src = src;
      imgEl.style.opacity = "1";
    }, 220);
  }

  function setCharacter(key) {
    const character = characters[key];
    currentCharacterKey = key;

    softImageChange(welcomePortrait, character.avatar);
    softImageChange(sideAvatar, character.avatar);
    softImageChange(consolePortrait, character.avatar);
    softImageChange(chatAvatar, character.avatar);

    sideName.textContent = character.name;
    sideStatus.textContent = character.status;
    chatName.textContent = character.name;

    $$(".avatar-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.character === key);
    });

    $$(".mini-avatar").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.character === key);
    });

    typeText(character.welcome);
    renderChat(true);
  }

  function setMode(key) {
    const mode = modes[key];
    currentModeKey = key;

    softImageChange(viewScene, mode.scene);
    softImageChange(welcomeScene, mode.scene);

    modeTitle.textContent = mode.title;
    modeSubtitle.textContent = mode.subtitle;
    currentModePill.textContent = mode.label;
    todayModeText.textContent = mode.sideText;

    $$(".mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === key);
    });

    if (key === "talk") {
      stopTimer(false);
      focusPanel.classList.add("hidden");
      chatPanel.classList.remove("hidden");
      renderChat(true);
      showToast("已进入对话模式");
      return;
    }

    chatPanel.classList.add("hidden");
    focusPanel.classList.remove("hidden");

    timerDuration = mode.timer;
    timerRemaining = timerDuration;
    timerRunning = false;

    focusLabel.textContent = mode.focusLabel;
    timerHint.textContent = mode.hint;
    toggleTimer.textContent = "开始";

    renderTimer();
    showToast(`已切换到${mode.label}`);
  }

  function renderTimer() {
    timerDisplay.textContent = formatTime(timerRemaining);

    const progress =
      timerDuration === 0 ? 0 : 1 - timerRemaining / timerDuration;

    progressBar.style.width = `${Math.round(progress * 100)}%`;
    sideProgressText.textContent = `${Math.round(progress * 100)}%`;
  }

  function startTimer() {
    if (timerRunning) return;

    timerRunning = true;
    toggleTimer.textContent = "暂停";

    timerId = setInterval(() => {
      timerRemaining--;

      if (timerRemaining <= 0) {
        timerRemaining = 0;
        renderTimer();
        stopTimer(true);
        return;
      }

      renderTimer();
    }, 1000);
  }

  function stopTimer(finished) {
    timerRunning = false;
    clearInterval(timerId);
    timerId = null;
    toggleTimer.textContent = "开始";

    if (finished) {
      showToast("完成了，先休息一下吧");
    }
  }

  function resetTimer() {
    stopTimer(false);
    timerRemaining = timerDuration;
    renderTimer();
    showToast("已重置");
  }

  function appendMessage(text, fromMe = false) {
    const character = characters[currentCharacterKey];

    const row = document.createElement("div");
    row.className = fromMe ? "message from-me" : "message";

    row.innerHTML = `
      <img src="${fromMe ? character.avatar : character.avatar}" alt="${character.name}" />
      <div class="bubble">${text}</div>
    `;

    chatList.appendChild(row);
    chatList.scrollTop = chatList.scrollHeight;
  }

  function renderChat(reset = false) {
    if (!chatList) return;

    const character = characters[currentCharacterKey];

    if (reset) {
      chatList.innerHTML = "";
    }

    if (chatList.children.length === 0) {
      character.chat.forEach((line, index) => {
        setTimeout(() => {
          appendMessage(line, false);
        }, index * 280);
      });
    }
  }

  function sendMessage() {
    const value = chatInput.value.trim();

    if (!value) return;

    appendMessage(value, true);
    chatInput.value = "";

    const replies = characters[currentCharacterKey].chat;
    const reply = replies[Math.floor(Math.random() * replies.length)];

    setTimeout(() => {
      appendMessage(reply, false);
    }, 650);
  }

  // 迎宾页角色切换
  $$(".avatar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setCharacter(btn.dataset.character);
    });
  });

  // 主控制台角色切换
  $$(".mini-avatar").forEach((btn) => {
    btn.addEventListener("click", () => {
      setCharacter(btn.dataset.character);
      showToast(`已切换陪伴角色`);
    });
  });

  // 模式切换
  $$(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
    });
  });

  enterBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    appShell.classList.remove("hidden");
    setMode("study");
    showToast("欢迎回来");
  });

  toggleTimer.addEventListener("click", () => {
    if (currentModeKey === "talk") return;

    if (timerRunning) {
      stopTimer(false);
      showToast("已暂停");
    } else {
      startTimer();
      showToast("开始陪伴");
    }
  });

  resetTimer.addEventListener("click", resetTimer);

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // 初始化
  setCharacter("gushiye");
  setMode("study");
  renderTimer();
});
