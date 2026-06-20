import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool notifications = true;
  bool emailAlerts = true;
  bool smsAlerts = false;
  bool darkMode = false;
  bool locationAccess = true;

  final Color indigo = AppColor.accent;
  final Color bg = AppColor.background;
  final Color red = const Color(0xFFEF4444);
  final Color green = const Color(0xFF22C55E);
  final Color amber = const Color(0xFFF59E0B);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bg,
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _heroCard(),

            const SizedBox(height: 18),

            _section("Notifications"),
            _group([
              _switchTile(
                icon: Icons.notifications_active_outlined,
                title: "Push Notifications",
                subtitle: "App updates, gigs & messages",
                value: notifications,
                onChanged: (v) => setState(() => notifications = v),
              ),
              _divider(),
              _switchTile(
                icon: Icons.email_outlined,
                title: "Email Alerts",
                subtitle: "Important account updates",
                value: emailAlerts,
                onChanged: (v) => setState(() => emailAlerts = v),
              ),
              _divider(),
              _switchTile(
                icon: Icons.sms_outlined,
                title: "SMS Alerts",
                subtitle: "Security & order updates",
                value: smsAlerts,
                onChanged: (v) => setState(() => smsAlerts = v),
              ),
            ]),

            const SizedBox(height: 14),

            _section("Account"),
            _group([
              _item(
                Icons.person_outline,
                "Profile Information",
                "Edit name, email, phone",
                indigo,
              ),
              _item(
                Icons.wallet_outlined,
                "Wallet",
                "Payments, earnings & withdrawals",
                green,
              ),
              _item(Icons.language, "Language", "English (US)", amber),
              _item(
                Icons.location_on_outlined,
                "Location",
                "Manage location access",
                indigo,
              ),
            ]),

            const SizedBox(height: 14),

            _section("Security"),
            _group([
              _item(
                Icons.lock_outline,
                "Password",
                "Change login password",
                red,
              ),
              _item(
                Icons.shield_outlined,
                "Two-Factor Authentication",
                "Secure your account",
                indigo,
              ),
              _switchTile(
                icon: Icons.gps_fixed,
                title: "Location Access",
                subtitle: "Allow app to use location",
                value: locationAccess,
                onChanged: (v) => setState(() => locationAccess = v),
              ),
            ]),

            const SizedBox(height: 14),

            _section("Preferences"),
            _group([
              _switchTile(
                icon: Icons.dark_mode_outlined,
                title: "Dark Mode",
                subtitle: "Switch app theme",
                value: darkMode,
                onChanged: (v) => setState(() => darkMode = v),
              ),
            ]),

            const SizedBox(height: 24),

            _logout(),
          ],
        ),
      ),
    );
  }

  // ================= HERO CARD (REDESIGNED PREMIUM) =================
  Widget _heroCard() {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(
          colors: [AppColor.accent, Color(0xFF6366F1)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: indigo.withOpacity(0.25),
            blurRadius: 25,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // TOP HEADER
            Row(
              children: [
                Stack(
                  children: [
                    const CircleAvatar(
                      radius: 34,
                      backgroundColor: Colors.white,
                      child: Icon(
                        Icons.person,
                        color: AppColor.accent,
                        size: 30,
                      ),
                    ),
                    Positioned(
                      bottom: 2,
                      right: 2,
                      child: Container(
                        width: 12,
                        height: 12,
                        decoration: const BoxDecoration(
                          color: Colors.green,
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Text(
                    "Chukwuemeka Ekine",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.edit, color: Colors.white, size: 18),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // USER INFO PANEL
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.12),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  _infoRow("Email", "chukwuemekacodev@gmail.com"),
                  const SizedBox(height: 10),
                  _infoRow("Phone", "09039124772"),
                  const SizedBox(height: 10),
                  _infoRow("Username", "@ekine_dev"),
                  const SizedBox(height: 10),
                  _infoRow("Location", "Lagos, Nigeria"),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // STATUS CHIPS
            Row(
              children: [
                _chip(Icons.verified, "Verified"),
                const SizedBox(width: 10),
                _chip(Icons.star, "4.9 Rating"),
                const SizedBox(width: 10),
                _chip(Icons.work_outline, "42 Gigs"),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _chip(IconData icon, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.15),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 14, color: Colors.white),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 11,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Row(
      children: [
        SizedBox(
          width: 80,
          child: Text(
            label,
            style: const TextStyle(color: Colors.white70, fontSize: 12),
          ),
        ),
        const Text(":", style: TextStyle(color: Colors.white38)),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w600,
              fontSize: 12,
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  // ================= UI HELPERS =================
  Widget _section(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10, top: 10),
      child: Text(
        title.toUpperCase(),
        style: const TextStyle(
          fontSize: 11,
          letterSpacing: 1.2,
          fontWeight: FontWeight.w700,
          color: Colors.grey,
        ),
      ),
    );
  }

  Widget _group(List<Widget> children) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(children: children),
    );
  }

  Widget _divider() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14),
      child: Divider(
        height: 1,
        thickness: 0.6,
        color: Colors.grey.withOpacity(0.15),
      ),
    );
  }

  Widget _item(IconData icon, String title, String subtitle, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: color.withOpacity(0.12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
          const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.grey),
        ],
      ),
    );
  }

  Widget _switchTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool value,
    required Function(bool) onChanged,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: indigo.withOpacity(0.08),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: indigo, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
          Switch(value: value, activeColor: indigo, onChanged: onChanged),
        ],
      ),
    );
  }

  Widget _logout() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: red.withOpacity(0.08),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Center(
        child: Text(
          "Log Out",
          style: TextStyle(color: red, fontWeight: FontWeight.w700),
        ),
      ),
    );
  }
}
