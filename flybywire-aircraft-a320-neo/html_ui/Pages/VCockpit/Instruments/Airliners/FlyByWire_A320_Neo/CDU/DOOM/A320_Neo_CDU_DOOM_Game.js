class CDU_DOOMFORK_DoomGame {
    // Properties
    static get WASMMemory() {
        return this._WASMMemory;
    }
    // Methods
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.DoomGameLoad;

        mcdu.setTemplate(FormatTemplate([
            [""],
            [""],
            [""],
            [""],
            [""],
            [new Column(7, "EXECUTING:")],
            [new Column(8, "DOOM.EXE")],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""]
        ]));

        mcdu.scratchpad.setText("STANDBY...");

        setTimeout((doomPage, mcdu) => {
            doomPage.LoadGame(mcdu);
        }, 3000, this, mcdu);
    }
    static LoadGame(mcdu) {
        const api = this.buildGameHTML(mcdu);
    }
    static buildGameHTML(mcdu) {
        mcdu.clearDisplay();
        const gameOverlayDiv = mcdu.getChildById("__DOOM_GAME_OVERLAY__");

        const gameContainerDiv = document.createElement("div");
        gameContainerDiv.classList.add("outer-container");
        gameOverlayDiv.appendChild(gameContainerDiv);

        const gameCanvas = document.createElement("canvas");
        gameContainerDiv.appendChild(gameCanvas);

        const doom_screen_width = 320 * 2;
        const doom_screen_height = 200 * 2;

        const thisRef = this;

        const api = {
            renderGame: data => {
                const doom_screen = new Uint8ClampedArray(thisRef.WASMMemory, data, doom_screen_width * doom_screen_height * 4);
                const render_screen = new ImageData(doom_screen, doom_screen_width, doom_screen_height);
                const ctx = canvas.getContext('2d');

                ctx.putImageData(render_screen, 0, 0);
            },
            destroyGame: () => {
                gameOverlayDiv.removeChild(gameContainerDiv);
            }
        };

        WebAssembly.instantiateStreaming(fetch("/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo/CDU/DOOM/DOOM_1997.wasm.game"), {
            js: {
                js_console_log: () => {},
                js_stdout: () => {},
                js_stderr: () => {},
                js_milliseconds_since_start: () => performance.now(),
                js_draw_screen: api.renderGame,
            },
            env: {
                memory: thisRef.WASMMemory
            }
        }).then(result => {
            this.setUnsupportedMessageForRemoteMCDUs();

            result.instance.exports.main();

            function step(timestamp) {
                result.instance.exports.doom_loop_step();
                window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        });

        mcdu.onUnload = destroyGame;

        return api;
    }
    static setUnsupportedMessageForRemoteMCDUs(mcdu) {
        mcdu.clearDisplay();
        // This will be sent to any remote MCDU clients
        // The in-game MCDU will have an overlay with the game within it.

        mcdu.setTemplate(FormatTemplate([
            [""],
            ["RUNNING DOOM GAME"],
            [""],
            ["REMOTE MCDU NOT SUPPORTED"],
            [""],
            ["USE IN-GAME MCDU"],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""]
        ]));
    }
}

CDU_DOOMFORK_DoomGame._WASMMemory = new WebAssembly.Memory({ initial : 108 });
