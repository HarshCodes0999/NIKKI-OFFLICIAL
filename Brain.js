"""
==========================================================
NIKKI AI BRAIN
----------------------------------------------------------
The Central Brain of NIKKI AI

Responsible For:
- Receiving Input
- Understanding
- Thinking
- Decision Making
- Routing
- Reflection

It NEVER executes actions directly.
==========================================================
"""

from datetime import datetime
import uuid


class NikkiBrain:

    def __init__(self):

        self.status = "IDLE"

        self.current_thought = None

        self.thought_history = []

        self.active_module = None


    # ==========================================
    # Receive Input
    # ==========================================

    def receive(self, user_input):

        self.status = "THINKING"

        thought = {

            "id": str(uuid.uuid4()),

            "input": user_input,

            "intent": None,

            "priority": "NORMAL",

            "confidence": 0,

            "decision": None,

            "next_module": None,

            "timestamp": datetime.now(),

            "state": "PROCESSING"

        }

        self.current_thought = thought

        return self.think()


    # ==========================================
    # Think
    # ==========================================

    def think(self):

        self.understand()

        self.reason()

        self.decide()

        self.route()

        self.reflect()

        return self.current_thought


    # ==========================================
    # Understand
    # ==========================================

    def understand(self):

        text = self.current_thought["input"].lower()

        if "open" in text:

            self.current_thought["intent"] = "OPEN"

            self.current_thought["confidence"] = 95

        elif "play" in text:

            self.current_thought["intent"] = "PLAY"

            self.current_thought["confidence"] = 95

        elif "search" in text:

            self.current_thought["intent"] = "SEARCH"

            self.current_thought["confidence"] = 90

        else:

            self.current_thought["intent"] = "CHAT"

            self.current_thought["confidence"] = 80


    # ==========================================
    # Reason
    # ==========================================

    def reason(self):

        self.current_thought["reason"] = (
            f"Detected intent: {self.current_thought['intent']}"
        )


    # ==========================================
    # Decision
    # ==========================================

    def decide(self):

        self.current_thought["decision"] = "APPROVED"


    # ==========================================
    # Route
    # ==========================================

    def route(self):

        routes = {

            "OPEN": "ACTION",

            "PLAY": "ACTION",

            "SEARCH": "SEARCH",

            "CHAT": "LANGUAGE"

        }

        self.active_module = routes.get(
            self.current_thought["intent"],
            "LANGUAGE"
        )

        self.current_thought["next_module"] = self.active_module


    # ==========================================
    # Reflection
    # ==========================================

    def reflect(self):

        self.current_thought["state"] = "READY"

        self.thought_history.append(self.current_thought)

        self.status = "IDLE"


    # ==========================================
    # Status
    # ==========================================

    def status_report(self):

        return {

            "brain_status": self.status,

            "active_module": self.active_module,

            "thoughts_processed": len(self.thought_history)

        }


# ==================================================
# Brain Instance
# ==================================================

BRAIN = NikkiBrain()


# Example
if __name__ == "__main__":

    result = BRAIN.receive("Open Chrome")

    print(result)

    print(BRAIN.status_report())