$(document).ready(function () {
    // Toggle other hobby input
    $('#otherHobbyCheckbox').on('change', function () {
        if ($(this).is(':checked')) {
            $('#otherHobbyInput').slideDown(300);
            $('#otherHobbyText').focus();
        } else {
            $('#otherHobbyInput').slideUp(300);
            $('#otherHobbyText').val('');
        }
    });
    // Form Submit Handler
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        // Get form values
        const username = $('#username').val().trim();
        const birthdate = $('#birthdate').val();
        const gender = $('input[name="gender"]:checked').val();
        const hobbies = [];

        $('input[name="hobby"]:checked').each(function () {
            hobbies.push($(this).val());
        });
        // Add other hobby if checked and filled
        if ($('#otherHobbyCheckbox').is(':checked')) {
            const otherHobby = $('#otherHobbyText').val().trim();
            if (otherHobby !== '') {
                hobbies.push(otherHobby);
            }
        }

        // Validation
        if (username === '') {
            showAlert('Username tidak boleh kosong!', 'warning');
            $('#username').focus();
            return false;
        }

        if (birthdate === '') {
            showAlert('Tanggal lahir tidak boleh kosong!', 'warning');
            $('#birthdate').focus();
            return false;
        }

        if (!gender) {
            showAlert('Jenis kelamin harus dipilih!', 'warning');
            return false;
        }

        if (hobbies.length === 0) {
            showAlert('Pilih minimal satu hobi!', 'warning');
            return false;
        }

        if ($('#otherHobbyCheckbox').is(':checked') && $('#otherHobbyText').val().trim() === '') {
            showAlert('Harap isi hobi lainnya atau hapus centang pada "Lainnya"!', 'warning');
            $('#otherHobbyText').focus();
            return false;
        }

        // Show success alert
        showAlert('Data berhasil dikirim!', 'success');

        // Format tanggal
        const dateObj = new Date(birthdate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('id-ID', options);

        // Create result HTML
        let hobbiesHTML = '';
        hobbies.forEach(hobby => {
            hobbiesHTML += `<span class="badge-hobby">${hobby}</span>`;
        });

        const resultHTML = `
                    <div class="result-item mb-3">
                        <strong class="d-block mb-2"><i class="fas fa-user"></i> Username:</strong>
                        <span class="text-dark">${username}</span>
                    </div>
                    <div class="result-item mb-3">
                        <strong class="d-block mb-2"><i class="fas fa-calendar-alt"></i> Tanggal Lahir:</strong>
                        <span class="text-dark">${formattedDate}</span>
                    </div>
                    <div class="result-item mb-3">
                        <strong class="d-block mb-2"><i class="fas fa-venus-mars"></i> Jenis Kelamin:</strong>
                        <span class="text-dark">${gender}</span>
                    </div>
                    <div class="result-item mb-3">
                        <strong class="d-block mb-2"><i class="fas fa-heart"></i> Hobi:</strong>
                        <div class="mt-2">${hobbiesHTML}</div>
                    </div>
                `;

        // Show modal with result
        $('#resultContent').html(resultHTML);
        const modal = new bootstrap.Modal(document.getElementById('resultModal'));
        modal.show();
    });

    // Reset button handler
    $('button[type="reset"]').on('click', function () {
        setTimeout(function () {
            $('#otherHobbyInput').hide();
            $('#otherHobbyText').val('');
            showAlert('Form telah direset!', 'info');
        }, 100);
    });


    // Alert function
    function showAlert(message, type) {
        const alertHTML = `
                    <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" role="alert" style="z-index: 9999; min-width: 300px;">
                        <i class="fas fa-exclamation-circle"></i> ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

        $('body').append(alertHTML);

        setTimeout(function () {
            $('.alert').fadeOut(500, function () {
                $(this).remove();
            });
        }, 3000);
    }
});