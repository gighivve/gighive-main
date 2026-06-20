import 'package:flutter/material.dart';
import 'package:application/core/widgets/FetchingUI.dart';
import 'package:application/features/home/services/homeApi.dart';
import 'package:application/features/home/widgets/transaction_card.dart';

class TransactionsScreen extends StatefulWidget {
  const TransactionsScreen({super.key});

  @override
  State<TransactionsScreen> createState() => _TransactionsScreenState();
}

class _TransactionsScreenState extends State<TransactionsScreen> {
  final TextEditingController controller = TextEditingController();

  String selectedType = "All";
  DateTime? fromDate;
  DateTime? toDate;

  // ================= FILTER LOGIC =================

  bool applyFilters(dynamic txn) {
    final query = controller.text.toLowerCase();

    final matchesSearch = (txn["description"] ?? "")
        .toString()
        .toLowerCase()
        .contains(query);

    final matchesType = selectedType == "All" || txn["type"] == selectedType;

    final txnDate = DateTime.parse(txn["date"]);

    final matchesDate = (fromDate == null || toDate == null)
        ? true
        : (txnDate.isAfter(fromDate!) &&
              txnDate.isBefore(toDate!.add(const Duration(days: 1))));

    return matchesSearch && matchesType && matchesDate;
  }

  // ================= DATE PICKERS =================

  Future<void> pickFromDate() async {
    final picked = await showDatePicker(
      context: context,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
    );

    if (picked != null) {
      setState(() => fromDate = picked);
    }
  }

  Future<void> pickToDate() async {
    final picked = await showDatePicker(
      context: context,
      firstDate: fromDate ?? DateTime(2020),
      lastDate: DateTime.now(),
    );

    if (picked != null) {
      setState(() => toDate = picked);
    }
  }

  // ================= UI =================

  @override
  Widget build(BuildContext context) {
    final types = ["All", "Credit", "Debit", "Transfer"];

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 12),

            // ================= CENTER WRAPPER =================
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 500),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // ================= SEARCH =================
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.search, color: Colors.grey),
                            const SizedBox(width: 10),
                            Expanded(
                              child: TextField(
                                controller: controller,
                                onChanged: (_) => setState(() {}),
                                decoration: const InputDecoration(
                                  hintText: "Search transactions...",
                                  border: InputBorder.none,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 12),

                    // ================= TYPE FILTER =================
                    SizedBox(
                      height: 45,

                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        itemCount: types.length,
                        separatorBuilder: (_, __) => const SizedBox(width: 8),
                        itemBuilder: (context, index) {
                          final type = types[index];
                          final active = selectedType == type;

                          return GestureDetector(
                            onTap: () => setState(() => selectedType = type),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 10,
                              ),
                              decoration: BoxDecoration(
                                color: active
                                    ? Colors.black
                                    : Colors.grey.shade200,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                type,
                                style: TextStyle(
                                  color: active ? Colors.white : Colors.black,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),

                    const SizedBox(height: 10),

                    // ================= RESTYLED DATE RANGE =================
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 14,
                          vertical: 12,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(18),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.06),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            const Icon(
                              Icons.calendar_month,
                              size: 18,
                              color: Colors.black87,
                            ),
                            const SizedBox(width: 10),

                            // FROM
                            Expanded(
                              child: InkWell(
                                onTap: pickFromDate,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      "From",
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: Colors.grey,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      fromDate == null
                                          ? "Start date"
                                          : "${fromDate!.day.toString().padLeft(2, '0')}/"
                                                "${fromDate!.month.toString().padLeft(2, '0')}/"
                                                "${fromDate!.year}",
                                      style: const TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),

                            Container(
                              height: 28,
                              width: 1,
                              margin: const EdgeInsets.symmetric(
                                horizontal: 10,
                              ),
                              color: Colors.grey.shade300,
                            ),

                            // TO
                            Expanded(
                              child: InkWell(
                                onTap: pickToDate,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    const Text(
                                      "To",
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: Colors.grey,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      toDate == null
                                          ? "End date"
                                          : "${toDate!.day.toString().padLeft(2, '0')}/"
                                                "${toDate!.month.toString().padLeft(2, '0')}/"
                                                "${toDate!.year}",
                                      style: const TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 10),

            // ================= TRANSACTIONS =================
            Expanded(
              child: FutureBuilder(
                future: fetchTransactions(),
                builder: (context, snapshot) {
                  if (!snapshot.hasData) return FetchUI(snaphot: "loading");
                  if (snapshot.hasError) return FetchUI(snaphot: "error");
                  final data = snapshot.data!
                      .where((txn) => applyFilters(txn))
                      .toList();
                  if (data.isEmpty) {
                    return const Center(child: Text("No transactions found"));
                  }
                  return ListView.builder(
                    padding: const EdgeInsets.all(10),
                    itemCount: data.length,
                    itemBuilder: (context, index) {
                      return TransactionCard(txn: data[index]);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
