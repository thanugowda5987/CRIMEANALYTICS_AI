class PlannerEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # =====================================================
    # Main Planner
    # =====================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "plan patrol" in question
            or "patrol plan" in question
        ):
            return self.patrol_plan()

        if (
            "deployment plan" in question
            or "deploy plan" in question
            or "operation plan" in question
        ):
            return self.deployment_plan()

        if (
            "security plan" in question
            or "security strategy" in question
        ):
            return self.security_plan()

        if (
            "night patrol" in question
        ):
            return self.night_patrol_plan()

        return None

    # =====================================================
    # Patrol Plan
    # =====================================================

    def patrol_plan(self):

        city = self.df["City"].value_counts().idxmax()
        count = self.df["City"].value_counts().max()

        return (
            "========== Patrol Plan ==========\n\n"
            f"Target City : {city}\n"
            f"Crime Records : {count}\n\n"
            "Recommended Deployment\n"
            "• 6 Patrol Vehicles\n"
            "• 18 Police Officers\n"
            "• Mobile Surveillance Unit\n"
            "• Smart CCTV Monitoring\n"
            "• Rapid Response Team\n\n"
            "Objective\n"
            "Reduce crime through continuous patrol."
        )

    # =====================================================
    # Deployment Plan
    # =====================================================

    def deployment_plan(self):

        return (
            "========== Police Deployment Plan ==========\n\n"
            "Step 1\n"
            "Deploy additional officers.\n\n"
            "Step 2\n"
            "Increase patrol frequency.\n\n"
            "Step 3\n"
            "Activate CCTV surveillance.\n\n"
            "Step 4\n"
            "Monitor hotspot locations.\n\n"
            "Step 5\n"
            "Review crime reports every evening."
        )

    # =====================================================
    # Security Strategy
    # =====================================================

    def security_plan(self):

        return (
            "========== Security Strategy ==========\n\n"
            "• Increase night patrol.\n"
            "• Install additional CCTV cameras.\n"
            "• Improve cyber monitoring.\n"
            "• Community policing.\n"
            "• Emergency response readiness.\n"
            "• Intelligence sharing between stations."
        )

    # =====================================================
    # Night Patrol Plan
    # =====================================================

    def night_patrol_plan(self):

        return (
            "========== Night Patrol Plan ==========\n\n"
            "18:00 - Patrol Team Deployment\n"
            "20:00 - Highway Monitoring\n"
            "22:00 - Hotspot Inspection\n"
            "00:00 - Commercial Area Patrol\n"
            "02:00 - Residential Surveillance\n"
            "04:00 - Final Security Review"
        )