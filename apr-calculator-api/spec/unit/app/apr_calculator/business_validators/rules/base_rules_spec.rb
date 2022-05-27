# frozen_string_literal: true

describe AprCalculator::BaseRules do
  context 'correct base rate rules' do
    subject { described_class }

    it do
      expect(subject.the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?(amount: 5000,
                                                                                     term: 36))
        .to be_truthy
    end
    it do
      expect(subject.the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?(amount: 10_000,
                                                                                     term: 48))
        .to be_truthy
    end
    it do
      expect(subject.the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?(amount: 15_000,
                                                                                   term: 60))
        .to be_truthy
    end
    it do
      expect(subject.the_max_amount_credit_score_equal_seven_hundred_or_above_is_hundred_thousand?(
               amount: 100_000,
               credit_score: 700
             ))
        .to be_truthy
    end
    it do
      expect(subject.the_max_score_between_six_hundred_and_six_hundre_ninety_nine_is_seventy_five_thousand?(
               amount: 75_000,
               credit_score: 699
             ))
        .to be_truthy
    end
    it do
      expect(subject.the_max_amount_credit_core_below_six_hundred_is_fifty_thousand?(
               amount: 50_000,
               credit_score: 500
             )).to be_truthy
    end
  end

  context 'invalid rate rules' do
    subject { described_class }

    it do
      expect(subject.the_min_amount_for_loans_up_thirty_six_months_is_five_thousand?(amount: 4000,
                                                                                     term: 36))
        .to be_falsey
    end
    it do
      expect(subject.the_min_amount_for_loans_up_forty_eight_months_is_ten_thousand?(amount: 9000,
                                                                                     term: 48))
        .to be_falsey
    end
    it do
      expect(subject.the_min_amount_for_loans_up_sixty_months_is_fifteen_thousand?(amount: 14_000,
                                                                                   term: 60))
        .to be_falsey
    end
    it do
      expect(subject.the_max_amount_credit_score_equal_seven_hundred_or_above_is_hundred_thousand?(
               amount: 200_000,
               credit_score: 700
             ))
        .to be_falsey
    end
    it do
      expect(subject.the_max_score_between_six_hundred_and_six_hundre_ninety_nine_is_seventy_five_thousand?(
               amount: 75_002,
               credit_score: 699
             ))
        .to be_falsey
    end
    it do
      expect(subject.the_max_amount_credit_core_below_six_hundred_is_fifty_thousand?(
               amount: 50_002,
               credit_score: 500
             )).to be_falsey
    end
  end
end
