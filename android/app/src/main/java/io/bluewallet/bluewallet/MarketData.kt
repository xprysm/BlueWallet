package io.bluewallet.bluewallet

import android.util.Log
import java.text.NumberFormat
import java.util.Locale
import java.util.Date

data class MarketData(
    var nextBlock: String = "...",
    var sats: String = "...",
    var price: String = "...",
    var rate: Double = 0.0,
    var dateString: String = ""
) {
    val formattedNextBlock: String
        get() {
            if (nextBlock == "..." || nextBlock == "!") {
                Log.d("MarketData", "Next block is a placeholder: $nextBlock")
                return nextBlock
            } else {
                try {
                    val nextBlockInt = nextBlock.toInt()
                    val numberFormatter = NumberFormat.getNumberInstance()
                    val formattedValue = "${numberFormatter.format(nextBlockInt)} sat/vb"
                    Log.d("MarketData", "Formatted next block: $formattedValue from $nextBlock")
                    return formattedValue
                } catch (e: Exception) {
                    Log.e("MarketData", "Error formatting next block value: $nextBlock", e)
                    return "$nextBlock sat/vb"
                }
            }
        }
    
    val formattedDate: String?
        get() {
            if (dateString.isEmpty()) return null
            
            try {
                // Simple implementation - proper implementation would parse ISO8601
                return Date().toString()
            } catch (e: Exception) {
                return null
            }
        }
        
    companion object {
        const val PREF_KEY = "market_data"
    }
    
    override fun toString(): String {
        return "MarketData(nextBlock=$nextBlock, sats=$sats, price=$price, rate=$rate, formattedNextBlock=$formattedNextBlock)"
    }
}
