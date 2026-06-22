import 'package:application/core/color.dart';
import 'package:application/core/widgets/FetchingUI.dart';
import 'package:application/core/widgets/sectionTitle.dart';
import 'package:application/features/discovery/services/service_api_data.dart';
import 'package:application/features/discovery/widgets/professional_card.dart';
import 'package:flutter/material.dart';

class GigsPage extends StatefulWidget {
  const GigsPage({super.key});

  @override
  State<GigsPage> createState() => _GigsPageState();
}

class _GigsPageState extends State<GigsPage> {
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// ================= HEADER =================
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Find trusted",
                          style: TextStyle(
                            fontSize: 14,
                            color: AppColor.primaryText.withOpacity(0.54),
                          ),
                        ),

                        const Text(
                          "services near you",
                          style: TextStyle(
                            fontSize: 21,
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        Text(
                          "Discover skilled professionals for any job.",
                          style: TextStyle(
                            fontSize: 13,
                            color: AppColor.primaryText.withOpacity(0.45),
                          ),
                        ),
                      ],
                    ),
                  ),

                  /// LOCATION CHIP
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 14,
                      vertical: 10,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 10,
                        ),
                      ],
                    ),
                    child: const Row(
                      children: [
                        Icon(
                          Icons.location_on,
                          color: AppColor.accent,
                          size: 16,
                        ),
                        SizedBox(width: 6),
                        Text("Lagos, NG"),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 20),

              /// ================= SEARCH =================
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14),
                height: 55,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 12,
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    const Icon(Icons.search, color: Colors.black45),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: _searchController,
                        decoration: const InputDecoration(
                          hintText: "What service are you looking for?",
                          hintStyle: TextStyle(fontSize: 14),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    Container(
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [Color(0xFF6366F1), AppColor.accent],
                        ),
                      ),
                      padding: const EdgeInsets.all(10),
                      child: const Icon(
                        Icons.tune,
                        color: Colors.white,
                        size: 18,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 15),

              /// ================= POPULAR =================
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  sectionTitle("Popular Services"),
                  Text("View all", style: TextStyle(color: AppColor.accent)),
                ],
              ),

              const SizedBox(height: 14),

              SizedBox(
                height: 40,
                child: FutureBuilder(
                  future: getMostSearch(),
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) return FetchUI(snaphot: "loading");
                    if (snapshot.hasError) return FetchUI(snaphot: "error");
                    final data = snapshot.data!;
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: data.map((service) {
                        final name = service["service"];
                        return Container(
                          padding: EdgeInsets.symmetric(horizontal: 10),
                          decoration: BoxDecoration(
                            color: const Color.fromARGB(94, 225, 224, 224),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Center(
                            child: Text(name, style: TextStyle(fontSize: 14)),
                          ),
                        );
                      }).toList(),
                    );
                  },
                ),
              ),

              const SizedBox(height: 24),

              /// ================= GIG LIST =================
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  sectionTitle("Top Picks Near You"),
                  Text(
                    "Within 5 km",
                    style: TextStyle(
                      color: AppColor.primaryText.withOpacity(0.54),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 14),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      FutureBuilder<List<dynamic>>(
                        future: gigsData(),
                        builder: (context, snapshot) {
                          if (!snapshot.hasData) {
                            return FetchUI(snaphot: "loading");
                          }
                          if (snapshot.hasError) {
                            return FetchUI(snaphot: "error");
                          }
                          final data = snapshot.data!;
                          return Column(
                            children: data.map((gig) {
                              return ProfessionalCard(gig: gig);
                            }).toList(),
                          );
                        },
                      ),

                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          gradient: const LinearGradient(
                            colors: [Color(0xFF6366F1), AppColor.accent],
                          ),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.shield, color: Colors.white),
                            const SizedBox(width: 10),
                            const Expanded(
                              child: Text(
                                "You're in safe hands. All professionals are verified.",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                            TextButton(
                              onPressed: () {},
                              child: const Text(
                                "Learn More",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),


              /// ================= SAFETY CARD =================
            ],
          ),
        ),
      ),
    );
  }
}
