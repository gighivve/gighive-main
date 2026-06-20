import 'package:application/core/color.dart';
import 'package:flutter/material.dart';

class GigCard extends StatelessWidget {
  final Map<String, dynamic> gig;

  const GigCard({super.key, required this.gig});

  @override
  Widget build(BuildContext context) {
    final bool isOnline = gig["online"] == true;

    const indigo = AppColor.accent;
    const green = Color(0xFF16A34A);
    const amber = Color(0xFFF59E0B);

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFF1F5F9)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        children: [
          /// PROFILE + STATUS (BG CHANGE)
          Stack(
            children: [
              CircleAvatar(
                radius: 30,
                backgroundImage: NetworkImage(gig["image"]),
              ),

              /// STATUS BADGE (BACKGROUND COLOR CHANGE)
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: isOnline ? green : amber,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.white, width: 1.5),
                  ),
                  child: Text(
                    isOnline ? "Online" : "Offline",
                    style: const TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(width: 12),

          /// MAIN INFO
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                /// NAME + VERIFIED
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        gig["name"],
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (gig["isVerified"] == true)
                      const Icon(Icons.verified, size: 18, color: indigo),
                  ],
                ),

                const SizedBox(height: 3),

                /// SERVICE
                Text(
                  gig["service"],
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey.shade600,
                    fontWeight: FontWeight.w500,
                  ),
                ),

                const SizedBox(height: 6),

                /// RATING
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: indigo.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.star, size: 13, color: indigo),
                          const SizedBox(width: 3),
                          Text(
                            "${gig["rating"]}",
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: indigo,
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(width: 6),

                    Text(
                      "(${gig["reviews"]})",
                      style: TextStyle(
                        fontSize: 11,
                        color: Colors.grey.shade500,
                      ),
                    ),

                    const SizedBox(width: 6),

                    Container(
                      width: 3,
                      height: 3,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        shape: BoxShape.circle,
                      ),
                    ),

                    const SizedBox(width: 6),

                    Text(
                      gig["distance"],
                      style: TextStyle(
                        fontSize: 11,
                        color: Colors.grey.shade500,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          /// RIGHT SIDE
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              /// PRICE (GREEN MONEY SIGNAL)
              Text(
                gig["price"],
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                  color: green,
                ),
              ),

              const SizedBox(height: 10),

              /// LIKE
              // Container(
              //   padding: const EdgeInsets.all(6),
              //   decoration: BoxDecoration(
              //     color: Colors.grey.shade100,
              //     shape: BoxShape.circle,
              //   ),
              //   child: const Icon(
              //     Icons.favorite_border,
              //     size: 17,
              //     color: indigo,
              //   ),
              // ),
              const SizedBox(height: 10),

              /// VIEW BUTTON
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: indigo,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Text(
                  "View",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
