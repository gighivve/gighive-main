// ignore_for_file: unused_local_variable

import 'package:application/core/color.dart';
import 'package:application/core/color.dart';
import 'package:flutter/material.dart';
import 'package:application/features/discovery/services/services_api.dart';

class ServicePage extends StatefulWidget {
  const ServicePage({super.key});

  @override
  State<ServicePage> createState() => _ServicePageState();
}

class _ServicePageState extends State<ServicePage> {
  final Color primary = AppColor.accent;

  List<Map<String, dynamic>> gigs = [];
  List<Map<String, dynamic>> filtered = [];

  bool loading = true;
  String activeTab = "all";

  @override
  void initState() {
    super.initState();
    load();
  }

  Future<void> load() async {
    setState(() => loading = true);
    gigs = await FakeApiService.fetchGigs();
    filtered = gigs;
    setState(() => loading = false);
  }

  void filter(String query) {
    setState(() {
      filtered = gigs.where((g) {
        final q = query.toLowerCase();
        return g["title"].toLowerCase().contains(q) ||
            g["client"].toLowerCase().contains(q) ||
            g["location"].toLowerCase().contains(q);
      }).toList();
    });
  }

  void filterByTab(String status) {
    setState(() {
      activeTab = status;
      if (status == "all") {
        filtered = gigs;
      } else {
        filtered = gigs.where((g) => g["status"] == status).toList();
      }
    });
  }

  void openDetail(String id) async {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => const Center(child: CircularProgressIndicator()),
    );

    final data = await FakeApiService.fetchGigDetail(id);

    Navigator.pop(context);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => Center(child: Text("modal")),
    );
  }

  Widget buildTab(String label, String key) {
    final isActive = activeTab == key;

    return GestureDetector(
      onTap: () => filterByTab(key),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? primary : Colors.white,
          borderRadius: BorderRadius.circular(22),
          border: Border.all(color: primary.withOpacity(0.15)),
          boxShadow: isActive
              ? [
                  BoxShadow(
                    color: primary.withOpacity(0.25),
                    blurRadius: 12,
                    offset: const Offset(0, 6),
                  ),
                ]
              : [],
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isActive ? Colors.white : Colors.grey.shade700,
            fontWeight: FontWeight.w600,
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  Widget buildCard(Map<String, dynamic> g) {
    Color statusColor = g["status"] == "completed"
        ? Colors.green
        : g["status"] == "ongoing"
        ? Colors.orange
        : Colors.red;

    return GestureDetector(
      onTap: () => openDetail(g["id"]),
      child: Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 10,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              height: 50,
              width: 50,
              decoration: BoxDecoration(
                color: primary.withOpacity(0.12),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(Icons.work, color: primary),
            ),
            const SizedBox(width: 12),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    g["title"],
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    "${g["client"]} • ${g["location"]}",
                    style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      g["status"].toUpperCase(),
                      style: TextStyle(
                        color: statusColor,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  "₦${g["amount"]}",
                  style: TextStyle(
                    color: primary,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 6),
                const Icon(
                  Icons.arrow_forward_ios,
                  size: 14,
                  color: Colors.grey,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget buildSearchBar() {
    return Container(
      margin: const EdgeInsets.only(top: 50, bottom: 16),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: primary.withOpacity(0.08),
            blurRadius: 18,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: primary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(Icons.search, color: primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: TextField(
              onChanged: filter,
              decoration: const InputDecoration(
                hintText: "Search services, clients, location...",
                border: InputBorder.none,
              ),
            ),
          ),
          Icon(Icons.tune, color: Colors.grey.shade600),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.background,

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  children: [
                    /// HEADER SEARCH
                    buildSearchBar(),

                    /// TABS
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          buildTab("All", "all"),
                          const SizedBox(width: 10),
                          buildTab("Ongoing", "ongoing"),
                          const SizedBox(width: 10),
                          buildTab("Completed", "completed"),
                          const SizedBox(width: 10),
                          buildTab("Canceled", "canceled"),
                        ],
                      ),
                    ),

                    const SizedBox(height: 16),

                    /// LIST
                    Expanded(
                      child: ListView.builder(
                        itemCount: filtered.length,
                        itemBuilder: (_, i) => buildCard(filtered[i]),
                      ),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
