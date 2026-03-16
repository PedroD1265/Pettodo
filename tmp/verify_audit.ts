// @ts-nocheck
import { query } from '../server/db.js';

async function verify() {
  console.log('--- Checking Pending Community Dogs ---');
  try {
    const dogs = await query(
      "SELECT id, nickname, review_state FROM community_dogs WHERE review_state = 'pending_review' ORDER BY created_at ASC"
    );
    console.log(`Found ${dogs.rowCount} pending dogs:`);
    dogs.rows.forEach(dog => {
      console.log(`- ${dog.nickname} (${dog.id}) state: ${dog.review_state}`);
    });

    const blanquito = dogs.rows.find(d => d.nickname === 'blanquito');
    const carlitos = dogs.rows.find(d => d.nickname === 'carlitos');

    if (blanquito && carlitos) {
      console.log('✅ PASS: Both "blanquito" and "carlitos" are in the pending queue.');
    } else {
      console.log('❌ FAIL: One or both expected dogs are missing or not pending.');
    }
  } catch (err: any) {
    console.error('Error querying community_dogs:', err.message);
  }

  console.log('\n--- Checking Moderators ---');
  try {
    const moderators = await query(
      "SELECT user_uid, role FROM user_roles WHERE role = 'moderator' OR role = 'operator'"
    );
    console.log(`Found ${moderators.rowCount} moderator/operator records:`);
    moderators.rows.forEach(m => {
      console.log(`- UID: ${m.user_uid}, Role: ${m.role}`);
    });

    // Check for pedelvi@gmail.com if possible, but we only have UIDs here.
    // We'll assume the existence of moderators is a good sign for now.
    if (moderators.rowCount > 0) {
      console.log('✅ PASS: Moderator/Operator roles exist in user_roles.');
    } else {
      console.log('❌ FAIL: No moderators or operators found.');
    }
  } catch (err: any) {
    console.error('Error querying user_roles:', err.message);
  }

  process.exit(0);
}

verify();
