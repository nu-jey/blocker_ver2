"use strict";

const db = require("../../config/db"); // db 객체 로드

// 체결 계약서 DB 접근 클래스
class SigningContractStorage {
  // 진행중 계약서들 정보 로드
  static load_signing_contracts_info(clientId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.signing_contract WHERE id = ?;",
        [clientId],
        (err, result) => {
          if (err) {
            reject(`${err}`);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // 특정 진행중 계약서 정보 로드 메서드
  static view_contract(contractId) {
    // 계약서 id를 매개변수로 받음
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM blocker_db.signing_contract WHERE contract_id = ?;", // DB에서 id와 일치하는 계약서 정보 탐색
        [contractId],
        (err, result) => {
          if (err) {
            // 에러 발생 시
            reject(`${err}`); // 에러 반환
          } else {
            resolve(result[0]); // 반환값 배열 형태이므로 첫번째 인덱스에 접근 후 데이터 반환
          }
        }
      );
    });
  }

  // 진행중 계약서 생성
  static insert_contract(contractData) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO blocker_db.signing_contract(title, content, id, contractors) VALUES(?, ?, ?, ?);", // 입력된 정보를 바탕으로 db에 계약서 추가
        [
          contractData.title,
          contractData.content,
          contractData.id,
          contractData.contractors,
        ],
        (err) => {
          if (err) reject(`${err}`); // 에러 반환
          else resolve({ success: true }); // 결과 반환
        }
      );
    });
  }

  // 진행중 계약서 삭제 메서드
  static delete_contract(contractId) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM blocker_db.signing_contract WHERE contract_id = ?;",
        [contractId],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = SigningContractStorage;